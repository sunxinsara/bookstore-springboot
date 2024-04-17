package com.bookstore.springbootbookstore;

import org.junit.jupiter.api.Test;

public class TestClass extends TC{
    public TestClass(){
        System.out.println("TestClass created");
    }
    static String str;

    public static void main(String[] args) {
        System.out.println("----------------");
        System.out.println(args);
        System.out.println(args.length);
        System.out.println(args[0]);
        System.out.println(args[1]);
        System.out.println("----------------");
        System.out.println(str);
        System.out.println("*****************");
        char c = 320;
        System.out.println(c);
        int b = 0;

        int rate = 100;
        int t = 5;
        double amount = 1000.0;
        for(int i = 0; i < t; i++){
            amount = amount *(1-rate/100);
        }
        System.out.println(amount);

        boolean b1 = false;
        boolean b2 = true;
        if ((b1 = false) && b2){
            System.out.println("22222222222");
        }
        System.out.println(b1 = false);

        byte x = 2;
        switch (x){
            case 'c':
                boolean melelel  = false;
                break;
            case -2:
                melelel = true;
                break;
            case -0:
                break;
        }
    }
}
 class TC extends java.util.HashMap{
    public TC(){
        super(100);
        System.out.println("TC created");
    }
}
