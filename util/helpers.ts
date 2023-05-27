export function extractDomain(url: string) {
  const anchor = document.createElement('a');
  anchor.href = url;
  const hostname = anchor.hostname;
  const domain = hostname.replace(/^www\./, '');
  return domain;
}

export function formatNumber(num: number) {
  if (num === 0) return '0';

  const isNegative = num < 0;
  num = Math.abs(num);

  let formattedNum;
  if (num >= 1000000000000) {
    formattedNum = (num / 1000000000000).toFixed(2).replace(/\.00$/, '') + 'T';
  } else if (num >= 1000000000) {
    formattedNum = (num / 1000000000).toFixed(2).replace(/\.00$/, '') + 'B';
  } else if (num >= 1000000) {
    formattedNum = (num / 1000000).toFixed(2).replace(/\.00$/, '') + 'M';
  } else if (num >= 1000) {
    formattedNum = (num / 1000).toFixed(2).replace(/\.00$/, '') + 'K';
  } else {
    formattedNum = num.toString();
  }

  return isNegative ? '-' + formattedNum : formattedNum;
}

export function getHiddenClasses(i: number, length: number) {
  let hiddenClasses = '';

  if (i === length - 1) {
    hiddenClasses += 'hidden ';
  }
  if (length % 2 === 0 && i === length - 2) {
    hiddenClasses += 'sm:hidden ';
  }
  if (length % 3 === 0 && i >= length - 3) {
    hiddenClasses += '2xl:hidden';
  } else if (length % 3 === 1 && i === length - 1) {
    hiddenClasses += '2xl:hidden';
  } else if (length % 3 === 2 && i >= length - 2) {
    hiddenClasses += '2xl:hidden';
  } else {
    hiddenClasses += '2xl:block';
  }

  return hiddenClasses;
}
