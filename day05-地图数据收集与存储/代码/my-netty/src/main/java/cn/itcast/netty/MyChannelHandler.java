package cn.itcast.netty;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.util.CharsetUtil;

/**
 * 自定义业务逻辑的处理器
 */
public class MyChannelHandler extends SimpleChannelInboundHandler<ByteBuf> {

    /**
     * 客户端发来消息（数据）执行该方法
     *
     * @param ctx
     * @param msg
     * @throws Exception
     */
    @Override
    protected void channelRead0(ChannelHandlerContext ctx, ByteBuf msg) throws Exception {
        String msgStr = msg.toString(CharsetUtil.UTF_8);
        System.out.println("接收到客户端发来的消息：" + msgStr);

        //向客户端发送消息
        ctx.writeAndFlush(Unpooled.copiedBuffer("ok", CharsetUtil.UTF_8));
    }
}
