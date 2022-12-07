package com.shf.netty;

import com.shf.netty.handler.MyChannelHandler;
import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;

public class MyNettyServer {
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
//                        添加自定义的处理器
                        ch.pipeline().addLast(new MyChannelHandler());
                    }
                }); // 5.业务逻辑处理器

//        6. 启动服务，监听6666端口
        try {
            ChannelFuture future = serverBootstrap.bind(6666).sync();
            System.out.println("netty 服务启动了");

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
