import { format } from 'date-fns';
import he from 'date-fns/locale/he';
import { IStat } from '../../@types/interfaces';
import { Stat } from '../../models/Stat';

const _formatTime = (date: Date) => {
	return format(date, 'HH:mm', {
		locale: he
	});
};

const _formatNumber = n => n.toLocaleString();

const _getGreetingMessage = () => {
	let greeting;
	const time = new Date().getUTCHours() + 3;

	if (time >= 0 && time < 5) {
		greeting = 'לילה טוב';
	} else if (time < 12 && time >= 5) {
		greeting = 'בוקר טוב';
	} else if (time <= 17) {
		greeting = 'צהריים טובים';
	} else if (time <= 20) {
		greeting = 'ערב טוב';
	} else {
		greeting = 'לילה טוב';
	}

	return greeting;
};

export const generateTemplate = (payload: Stat) => {
	const { light, mid, severe, recovered, deceased, treatment } = payload;

	const t = {
		greeting: `${_getGreetingMessage()}, הנתונים באתר עודכנו לשעה ${_formatTime(
			payload.date
		)}:`,
		total: 'סה"כ נדבקים:',
		active: 'חולים פעילים:',
		light: 'במצב קל:',
		mid: 'במצב בינוני:',
		severe: 'במצב קשה:',
		intubated: 'מונשמים:',
		recovered: 'מחלימים:',
		deceased: 'נפטרים:',
		hospital: 'מאושפזים בבתי חולים:',
		home: 'בטיפול בבית, במלון ובקהילה:'
	};

	// prettier-ignore
	const template = `${t.greeting}
	
		• *${t.total}* ${_formatNumber(light.cases + mid.cases + severe.cases + recovered + deceased)}

		• *${t.active}* ${_formatNumber(light.cases + mid.cases + severe.cases)}

		• *${t.light}* ${_formatNumber(light.cases)}

		• *${t.mid}* ${_formatNumber(mid.cases)}

		• *${t.severe}* ${_formatNumber(severe.cases)}

		• *${t.intubated}* ${_formatNumber(severe.intubated)}

		• *${t.recovered}* ${_formatNumber(recovered)}

		• *${t.deceased}* ${_formatNumber(deceased)}

		• *${t.hospital}* ${_formatNumber(treatment.hospital)}

		• *${t.home}* ${_formatNumber(treatment.home)}
		
		--------------------
	
		ניתן להיכנס לאתר על מנת להשוות בין העדכונים:
		https://feel.co.il
		
		לנתונים באתר משרד הבריאות:
		https://datadashboard.health.gov.il/COVID-19
	`;

	return template;
};
