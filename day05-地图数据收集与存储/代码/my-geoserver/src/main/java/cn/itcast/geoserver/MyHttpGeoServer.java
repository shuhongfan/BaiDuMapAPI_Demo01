package cn.itcast.geoserver;

import cn.hutool.core.util.StrUtil;
import cn.itcast.geoserver.config.MyConfig;
import cn.itcast.geoserver.handler.ServerHandler;
import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.handler.codec.http.HttpObjectAggregator;
import io.netty.handler.codec.http.HttpRequestDecoder;
import io.netty.handler.codec.http.HttpResponseEncoder;

public class MyHttpGeoServer {

    public static void main(String[] args) throws Exception {
        //定义BossGroup，用于接收用户的链接请求
        EventLoopGroup bossGroup = new NioEventLoopGroup(1);

        //定义WorkerGroup，用于业务逻辑的处理，默认线程数：cpu核数*2
        EventLoopGroup workerGroup = new NioEventLoopGroup();

        try {
            //构建Netty服务的辅助类
            ServerBootstrap serverBootstrap = new ServerBootstrap();

            serverBootstrap.group(bossGroup, workerGroup)
                    .channel(NioServerSocketChannel.class) //指定通道的处理类型，使用的是Nio方式
                    .childHandler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        protected void initChannel(SocketChannel ch) throws Exception {
                            ch.pipeline()
                                    .addLast(new HttpRequestDecoder()) //对于http协议的解码器
                                    .addLast(new HttpResponseEncoder()) //对http协议的编码器，用于数据响应
                                    .addLast(new HttpObjectAggregator(1024 * 128)) //将请求的数据，url中或请求头中聚合在一起
                                    .addLast(new ServerHandler()); //添加自定义的处理器
                        }
                    }); //业务逻辑处理器

            //启动服务
            int port = MyConfig.setting.getInt("server.port");
            ChannelFuture future = serverBootstrap.bind(port).sync();
            System.out.println(StrUtil.format("Netty服务启动了，端口号为：{}。。。。。", port));

            //等待监听关闭的信号，阻塞当前的线程，等待客户端的请求
            future.channel().closeFuture().sync();
        } finally {
            //优雅的关闭服务
            bossGroup.shutdownGracefully();
            workerGroup.shutdownGracefully();
        }
    }

}
