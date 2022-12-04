package com.jinyun.service;

public interface Function<T, E> {

    T callback(E e);

}