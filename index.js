const fetch = require("node-fetch");
const { Telegraf } = require("telegraf");
const serverConfig = {
  url: "https://178.208.90.56",
  timeout: 5000,
};

const chatId = "-1002078171202";
const message_thread_id = 3;

const bot = new Telegraf("6848774632:AAE0ldngGKgTjdriuEdqcCpTlxDhNCO03iM", {
  handlerTimeout: 9_000_000,
});
async function checkServerStatus() {
  try {
    const response = await fetch(serverConfig.url);
    if (!response.ok) {
      bot.telegram.sendMessage(chatId, `Код ошибки: ${response.status}`, {
        reply_to_message_id: 6172,
      });
      throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Сервер недоступен:", error.message);
    bot.telegram.sendMessage(chatId, `Ошибка ${error.message}`, {
      reply_to_message_id: 6172,
    });
    getStatusServer();
  }
}

async function getStatusServer() {
  try {
    const response = await fetch(serverConfig.url);
    bot.telegram.sendMessage(chatId, `Статус: ${response.status}`, {
      reply_to_message_id: 6172,
    });
  } catch (error) {
    bot.telegram.sendMessage(chatId, "Сервер не работает", {
      reply_to_message_id: 6172,
    });
  }
}

bot.on("text", (ctx) => {
  try {
    bot.telegram.setMyCommands([
      { command: "/server", description: "Узнать статус сервера" },
    ]);
    if (
      ctx.message.text === "/server" ||
      ctx.message.text === "/server@serverWorkKorotkovs_bot"
    ) {
      getStatusServer(ctx);
    }
  } catch (err) {
    console.log(err);
  }
});

setInterval(checkServerStatus, 5000);

bot.launch();
