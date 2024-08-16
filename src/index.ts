import { BasePlugin } from "@cool-midway/plugin-cli";
import axios from "axios";

/**
 * 描述
 */
export class SmsGetPlugin extends BasePlugin {
  /**
   * 發送驗證碼
   */
  async send(
    phone: string[],
    params: {
      template?: string;
      code?: string;
      expire?: string;
    }
  ) {
    const { username, password, template } = this.pluginInfo.config; // 獲取配置
    if (!username || !password) {
      throw new Error("請先配置好短信平台的帳號密碼");
    }
    if (!template && !params.template) {
      throw new Error("請先配置好短信平台的模板");
    }

    if (!phone.length) {
      throw new Error("號碼不可為空");
    }

    if (!params.code) {
      throw new Error("驗證碼不可為空");
    }

    let templateId = params.template || template;
    let paramsStr = "";
    // 替換模板中 ${code} ${expire}。
    if (templateId) {
      paramsStr = templateId
        .replace(/\${code}/g, params.code)
        .replace(/\${expire}/g, params.expire || "10");
    }

    const res = await axios.get("http://sms-get.com/api_send.php", {
      params: {
        username,
        password,
        method: "1",
        sms_msg: paramsStr,
        phone: phone.join(","),
      },
    });
    return res.data;
  }
}

// 导出插件实例， Plugin名称不可修改
export const Plugin = SmsGetPlugin;
