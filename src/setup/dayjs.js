import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

// Faqat locale emas, vaqt zonani ham to'g'rilash kerak bo'ladi
dayjs.locale(navigator.language || 'en');

export default dayjs;
