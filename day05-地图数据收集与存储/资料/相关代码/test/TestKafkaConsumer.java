package cn.itcast.kafka;

import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.junit.Test;

import java.time.Duration;
import java.util.Arrays;
import java.util.Properties;

public class TestKafkaConsumer {

    @Test
    public void testKafkaConsumer() {
        Properties properties = new Properties();
        //bootstrap.servers kafka集群地址 host1:port1,host2:port2 ....
        properties.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "192.168.31.81:9092,192.168.31.81:9093,192.168.31.81:9094");
        // key.deserializer 消息key序列化方式
        properties.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
        // value.deserializer 消息体序列化方式
        properties.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
        // group.id 消费组id
        properties.put(ConsumerConfig.GROUP_ID_CONFIG, "demo-group");
        // enable.auto.commit 设置自动提交offset
        properties.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, true);
        // auto.offset.reset
        properties.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");

        //创建消费者实例并订阅topic
        KafkaConsumer<String, String> consumer = new KafkaConsumer<>(properties);
        String[] topics = new String[]{"MY-GEO-SERVER"};
        consumer.subscribe(Arrays.asList(topics));

        //消费消息
        while (true) {
            ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(1000));
            for (ConsumerRecord<String, String> record : records) {
                System.out.println(record);
            }
        }
    }
}
