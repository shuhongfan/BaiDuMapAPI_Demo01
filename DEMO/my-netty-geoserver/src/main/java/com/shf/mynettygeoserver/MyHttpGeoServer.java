package com.shf.mynettygeoserver;

import com.shf.mynettygeoserver.config.MyConfig;
import com.shf.mynettygeoserver.handler.ServerHandler;
import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.handler.codec.http.HttpObjectAggregator;
import io.netty.handler.codec.http.HttpRequestDecoder;
import io.netty.handler.codec.http.HttpResponseEncoder;

public class MyHttpGeoServer {
    public static void main(String[] args) {
//        1.定义BossGroup，用于接收用户的链接请求
        NioEventLoopGroup bossGroup = new NioEventLoopGroup(1);

//        2. 定义WorkGroup，用于业务逻辑的处理，默认线程数：cpu核数*2
        NioEventLoopGroup workerGroup = new NioEventLoopGroup();

//        3. 构建Netty服务的辅助类
        ServerBootstrap serverBootstrap = new ServerBootstrap();

        serverBootstrap.group(bossGroup, workerGroup)
                .channel(NioServerSocketChannel.class) // 4.指定通道的处理类型，使用的是NIO方式
                .childHandler(new ChannelInitializer<SocketChannel>() {
                    @Override
                    protected void initChannel(SocketChannel ch) throws Exception {
                        ch.pipeline()
                                .addLast(new HttpRequestDecoder()) // 对于http的解码器
                                .addLast(new HttpResponseEncoder()) // 对于http协议的编码器，用于数据响应
                                .addLast(new HttpObjectAggregator(1024*128)); // 请求的数据
//                        添加自定义的处理器
                        ch.pipeline().addLast(new ServerHandler());
                    }
                }); // 5.业务逻辑处理器

//        6. 启动服务，监听6666端口
        try {
            Integer port = MyConfig.setting.getInt("server.port");
            ChannelFuture future = serverBootstrap.bind(port).sync();
            System.out.println("netty 服务启动了，端口号为："+port);

//            等待监听关闭的信号，阻塞当前的线程，等待客户的请求
            future.channel().closeFuture().sync();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } finally {
            bossGroup.shutdownGracefully();
            workerGroup.shutdownGracefully();
        }
    }
}
