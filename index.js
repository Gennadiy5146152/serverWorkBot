const fetch = require("node-fetch");
const TelegramBot = require("node-telegram-bot-api");
const serverConfig = {
  url: "https://korotkovs.com/",
  timeout: 5000,
};

const chatId = "-1002078171202";

const bot = new TelegramBot("6848774632:AAE0ldngGKgTjdriuEdqcCpTlxDhNCO03iM", {
  polling: true,
});
async function checkServerStatus() {
  try {
    const response = await fetch(serverConfig.url, {
      timeout: serverConfig.timeout,
    });
    if (response.status !== 200) {
      throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Сервер недоступен:", error.message);
    bot.sendMessage(chatId, "Сервер не работает");
  }
}

setInterval(checkServerStatus, 60000);
