const TelegramBot = require('node-telegram-bot-api');

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(TOKEN);

module.exports = async (req, res) => {
  try {
    const { body } = req;

    if (!body || !body.message) {
      res.status(200).send('OK');
      return;
    }

    const msg = body.message;
    const chatId = msg.chat.id;
    const text = msg.text || '';
    const firstName = msg.from?.first_name || 'друг';

    if (text === '/start') {
      const keyboard = {
        inline_keyboard: [
          [{ text: '🚀 Продвинуть канал', callback_data: 'promote' }],
          [{ text: '💰 Заработать', callback_data: 'earn' }],
          [{ text: '👤 Профиль', callback_data: 'profile' }],
          [{ text: 'ℹ️ Помощь', callback_data: 'help' }]
        ]
      };

      await bot.sendMessage(chatId,
        `👋 Привет, ${firstName}!\n\n` +
        `Я — *GramPilot* — бот для продвижения каналов и заработка.\n\n` +
        `Здесь ты можешь:\n` +
        `• 📢 Продвинуть свой канал\n` +
        `• 💰 Заработать на подписках\n` +
        `• 👤 Смотреть свой профиль\n\n` +
        `Выбери действие:`,
        { parse_mode: 'Markdown', reply_markup: keyboard }
      );
    } else if (text === '/help') {
      await bot.sendMessage(chatId,
        `📖 *Помощь GramPilot*\n\n` +
        `/start — главное меню\n` +
        `/help — эта справка\n\n` +
        `Бот находится в разработке. Совсем скоро здесь появятся задания и баланс!`
      );
    } else {
      await bot.sendMessage(chatId,
        `Эхо: ${text}\n\n_Бот пока в разработке. Нажми /start чтобы увидеть меню._`,
        { parse_mode: 'Markdown' }
      );
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('Ошибка:', error.message);
    res.status(200).send('OK');
  }
};
