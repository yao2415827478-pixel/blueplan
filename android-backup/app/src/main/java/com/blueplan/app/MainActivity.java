package com.blueplan.app;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.blueplan.app.plugin.AlipayPlugin;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // 注册支付宝插件
        registerPlugin(AlipayPlugin.class);
    }
}
