import config from "./config";

export default function (url, data = {}, method = "GET") {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.mpHost + url,
      data,
      method,
      header: {
        // 不toString结果是[object Array]
        cookie: JSON.parse(wx.getStorageSync("cookies") || "[]").toString(),
      },
      success: (res) => {
        if (data.isLogin) {
          let cookies = res.cookies;
          wx.setStorage({
            key: "cookies",
            data: JSON.stringify(cookies),
          });
        }
        resolve(res.data);
        // console.log(res);
      },
    });
  });
}
