package com.shf.mynettygeoserver.handler;

import cn.hutool.core.map.MapUtil;
import cn.hutool.json.JSONUtil;
import com.shf.mynettygeoserver.service.KafkaService;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelFutureListener;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.handler.codec.http.*;
import io.netty.util.CharsetUtil;

/**
 * Http web服务处理器
 */
public class ServerHandler extends SimpleChannelInboundHandler<FullHttpRequest> {

    private KafkaService kafkaService = new KafkaService();

    @Override
    protected void channelRead0(ChannelHandlerContext channelHandlerContext, FullHttpRequest fullHttpRequest) throws Exception {
//        获取请求中的参数
        Request request = Request.build(channelHandlerContext, fullHttpRequest);

//        发送消息
        kafkaService.sendMsg(request);

        Long userId = request.getLongParam("userId", 0L);
        System.out.println("获取到参数 userid=" + userId);

//        响应数据
        String result = JSONUtil.toJsonStr(MapUtil.builder().put("status", "ok").build());

        response(channelHandlerContext, result);
    }

    private void response(ChannelHandlerContext channelHandlerContext, String result) {
        //        给客户端响应
        FullHttpResponse httpResponse = new DefaultFullHttpResponse(HttpVersion.HTTP_1_1, HttpResponseStatus.OK);

//        响应的内容
        httpResponse.content().writeBytes(Unpooled.copiedBuffer(result, CharsetUtil.UTF_8));

//        设置响应头
        httpResponse.headers().set(HttpHeaderNames.CONTENT_TYPE, "application/json; charset=utf-8");

        channelHandlerContext.writeAndFlush(httpResponse)
                .addListener(ChannelFutureListener.CLOSE); // http是短连接，响应完成后需要将Channel关闭掉

    }
}
