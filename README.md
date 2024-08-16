### 介绍

调用SMS-Get 商務簡訊服务，发送短信，需要先在SMS-Get注冊賬號並開通，获取 `username` 和 `password`，然后配置到插件中

注意，配置上对应的权限

### 标识

调用插件的时候需要用到标识，标识是唯一的，不能重复，建议使用英文，不要使用中文，对应插件 `plugin.json` 中的 `key` 字段

- 标识：sms-get

### 配置

```json
{
  "username": "xxx", // 簡訊平台帳號
  "password": "xxx",  // 簡訊平台密碼 
  "template": "【xx】您的验证码是：${code}，请在${expire}分钟内输入。" // 短信模板
}
```

### 方法

下面是插件提供的一些方法

- send

```ts
/**
   * 发送
   * @param phone 手机号数组 最多不要超过200个手机号
   * @param params 参数数组 短信模板参数, 例如: {code: '1234', expire: '10', template: '您的验证码是：${code}，请在${expire}分钟内输入。'}
   * @returns 返回结果
   */
  async send(
    phone: string[],
    params: {
      template?: string; // 模板
      code?: string; // 验证码
      expire?: string; // 过期时间
    },
  )
```

### 调用示例

```ts
@Inject()
pluginService: PluginService;

// 发送
await this.pluginService.invoke(
      'sms-get',
      'send',
      ['xxxx', 'xxxx'],
      { code: '1234', expire: '10' }
    )

// 带模板
await this.pluginService.invoke(
      'sms-get',
      'send',
      ['xxxx', 'xxxx'],
      { code: '1234', expire: '10', template: '【xx】您的验证码是：${code}，请在${expire}分钟内输入。' }

    )
```

### 更新日志

- v1.0.0 (2024-08-17)
  - 初始版本
