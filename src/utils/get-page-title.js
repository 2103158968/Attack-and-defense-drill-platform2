import defaultSettings from '@/settings'

const title = defaultSettings.title || '创智攻防演练平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
