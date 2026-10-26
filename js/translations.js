/* =========================================================
   parumi.ru — тексты сайта на двух языках
   ---------------------------------------------------------
   Ключ совпадает с атрибутом data-i18n в index.html.
   В index.html лежит русская версия (видна до загрузки JS),
   поэтому русский текст меняй в обоих файлах.
   ========================================================= */

var TRANSLATIONS = {

  /* --- Вкладка браузера --- */
  page_title: { ru: 'Parumi — системный администратор', en: 'Parumi — system administrator' },

  /* --- Центр схемы: портрет --- */
  avatar_alt: { ru: 'Портрет Parumi, рисунок тушью',        en: 'Parumi’s portrait, ink drawing' },
  role:       { ru: 'Системный администратор, Калининград', en: 'System administrator, Kaliningrad' },

  /* --- Контакты на схеме --- */
  g_write:   { ru: 'Написать лично',    en: 'Write to me' },
  g_follow:  { ru: 'Следить за мной',   en: 'Follow me' },
  l_mail:    { ru: 'Почта',             en: 'Email' },
  l_channel: { ru: 'Telegram-канал',    en: 'Telegram channel' },
  copy:      { ru: 'Скопировать адрес', en: 'Copy address' },
  copied:    { ru: 'Адрес скопирован',  en: 'Address copied' },

  /* --- О себе --- */
  lead: {
    ru: 'Привет! Я Parumi — поднимаю Linux-серверы, собираю сети и пишу скрипты, которые делают рутину за меня.',
    en: 'Hi! I’m Parumi — I run Linux servers, build networks and write scripts that do the routine work for me.'
  },
  lead2: {
    ru: 'Сейчас строю FoxRoute — мониторинг и удалённую IT-поддержку для небольших бизнесов. Открыт к сотрудничеству и интересным задачам.',
    en: 'Right now I’m building FoxRoute — monitoring and remote IT support for small businesses. Open to collaboration and interesting problems.'
  },

  /* --- Чем занимаюсь --- */
  h_do: { ru: 'Чем занимаюсь', en: 'What I do' },
  s1_t: { ru: 'Linux-серверы', en: 'Linux servers' },
  s1_d: { ru: 'ALT Linux, DNS на BIND, Samba DC, NFS — от установки до документации.',
          en: 'ALT Linux, BIND DNS, Samba DC, NFS — from install to documentation.' },
  s2_t: { ru: 'Сети', en: 'Networking' },
  s2_d: { ru: 'VLAN, OSPF, GRE-туннели, VPN, оборудование MikroTik.',
          en: 'VLANs, OSPF, GRE tunnels, VPNs, MikroTik gear.' },
  s3_t: { ru: 'Виртуализация', en: 'Virtualization' },
  s3_d: { ru: 'Proxmox, домашняя лаборатория для тестов и сервисов.',
          en: 'Proxmox and a home lab for testing and services.' },
  s4_t: { ru: 'Автоматизация', en: 'Automation' },
  s4_d: { ru: 'Скрипты, мониторинг и удалённый доступ к инфраструктуре.',
          en: 'Scripts, monitoring and remote access to infrastructure.' },

  /* --- Проекты --- */
  h_proj: { ru: 'Проекты', en: 'Projects' },
  p1: { ru: 'Мониторинг и удалённая IT-поддержка для кафе, магазинов и небольших офисов.',
        en: 'Monitoring and remote IT support for cafés, shops and small offices.' },
  p2: { ru: 'Скрипты, конфиги и исходники моих проектов.',
        en: 'Scripts, configs and source code for my projects.' }
};
