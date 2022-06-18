const fs = require('fs');
const moment = require('moment');

const djName = '東'

const parseRawWhatsappRecord = (filename = 'raw-whatsapp-record.txt') => {
  const dateRegex = /\d{1,2}\/\d{1,2}\/\d{1,2}, \d{1,2}:\d{1,2} - /g;
  const excludeKeywords = [
    "Messages and calls are end-to-end encrypted.",
    "You changed the group description",
    "joined using this group's invite link\n",
    "You added",
    'left\n',
    '<Media omitted>'
  ];

  fs.readFile(`../../public/${filename}`, 'utf8', function (err, data) {
    if (err) throw err;
    const dates = data.match(dateRegex);
    const messages = data.split(dateRegex);

    const parsedData = dates.map((d, i) => {
      if (
        excludeKeywords.some(d => messages[i].includes(d)) ||
        messages[i].length === 0
      ) return;
      const datetime = moment(d.slice(0, -3), 'MM/DD/YY, hh:mm');
      const [sender, ...m] = messages[i].split(':');
      const message = m.join(':');

      if (message.length === 0) return;
      return {
        datetime: datetime.format(),
        isDj: sender === djName,
        message: message.slice(1, -1)
      }
    }).filter(d => !!d)

    fs.writeFile("../../public/parsed-record.json", JSON.stringify(parsedData), function (err, result) {
      if (err) console.log('error', err);
    });
  });
}
parseRawWhatsappRecord()