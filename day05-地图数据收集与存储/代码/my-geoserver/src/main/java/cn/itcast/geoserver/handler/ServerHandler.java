package cn.itcast.geoserver.handler;

import cn.hutool.core.map.MapUtil;
import cn.hutool.json.JSONUtil;
import cn.itcast.geoserver.service.KafkaService;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelFutureListener;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.handler.codec.http.*;
import io.netty.util.CharsetUtil;

/**
 * http web服务处理器
 */
public class ServerHandler extends SimpleChannelInboundHandler<FullHttpRequest> {

    private KafkaService kafkaService = new KafkaService();

    @Override
    protected void channelRead0(ChannelHandlerContext ctx, FullHttpRequest fullHttpRequest) throws Exception {
        //获取请求中的参数
        Request request = Request.build(ctx, fullHttpRequest);

        //发送消息
        this.kafkaService.sendMsg(request);

        //响应数据
        String result = JSONUtil.toJsonStr(MapUtil.builder().put("status", "ok").build());
        this.response(ctx, result);
    }

    private void response(ChannelHandlerContext ctx, String result){
        //给客户端响应
        FullHttpResponse httpResponse = new DefaultFullHttpResponse(HttpVersion.HTTP_1_1, HttpResponseStatus.OK);
        //响应的内容
        httpResponse.content().writeBytes(Unpooled.copiedBuffer(result, CharsetUtil.UTF_8));
        //设置响应头
        httpResponse.headers().set(HttpHeaderNames.CONTENT_TYPE, "application/json; charset=utf-8");

        ctx.writeAndFlush(httpResponse)
                .addListener(ChannelFutureListener.CLOSE); //http是短连接，响应完成后需要将Channel关闭掉
    }


}
