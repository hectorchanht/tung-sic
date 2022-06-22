const fs = require('fs');
const moment = require('moment');


const parseRawWhatsappRecord = async (
  { admin = '東' },
  { filename = 'raw-whatsapp-record.txt' }
) => {
  const { nanoid } = await import('nanoid');

  const dateRegex = /\d{1,2}\/\d{1,2}\/\d{1,2}, \d{1,2}:\d{1,2} - /g;
  const excludeKeywords = [
    "Messages and calls are end-to-end encrypted.",
    "You changed the group description",
    "joined using this group's invite link\n",
    "You added",
    'left\n',
    '<Media omitted>'
  ];
  fs.readFile(`./${filename}`, 'utf8', function (err, data) {
    if (err) throw err;
    const dates = data.match(dateRegex);
    const messages = data.split(dateRegex);

    const senders = new Set();
    let stories = [];

    const parsedData = dates.map((date, i) => {
      if (
        excludeKeywords.some(d => messages[i].includes(d)) ||
        messages[i].length === 0
      ) return;
      const datetime = moment(date.slice(0, -3), 'MM/DD/YY, hh:mm');
      const [sender, ...m] = messages[i].split(':');
      const message = m.join(':');

      senders.add(sender)

      if (message.length === 0) returheadn;
      return {
        datetime: datetime.format(),
        isDj: sender === admin,
        message: message.slice(1, -1),
        id: nanoid()
      }
    }).filter((d) => {
      return !!d?.message || !!d
    });

    const metaData = {
      senders,
      stories
    }

    fs.writeFile("../../public/parsed-record.json", JSON.stringify(parsedData), function (err, result) {
      if (err) console.log('error', err);
    });

    fs.writeFile("../../public/meta-data.json", JSON.stringify(metaData), function (err, result) {
      if (err) console.log('error', err);
    });
  });
};

parseRawWhatsappRecord();