import { isDev } from "@/utils";
import { API_DEV, API_PROD } from "./constant";

export default {
  siteName: 'Admin basic',
  copyright: 'Admin basic  ©2020 shushushu',
  logoPath: '/logo.png',
  apiPrefix: isDev() ? API_DEV : API_PROD,

  layouts: [
    {
      name: 'primary',
      include: [/.*/],
      exclude: [/(\/(en|zh))*\/login/],
    }
  ]
};