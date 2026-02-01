import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// FR
import frCommon from './locales/fr/common.json';
import frHome from './locales/fr/home.json';
import frSites from './locales/fr/sites.json';
import frServices from './locales/fr/services.json';
import frDoctors from './locales/fr/doctors.json';
import frEvents from './locales/fr/events.json';
import frJobs from './locales/fr/jobs.json';
import frNewborns from './locales/fr/newborns.json';
import frPatientInfo from './locales/fr/patient-info.json';
import frUrgences from './locales/fr/urgences.json';
import frAppointments from './locales/fr/appointments.json';
import frContact from './locales/fr/contact.json';
import frSearch from './locales/fr/search.json';
import frAuth from './locales/fr/auth.json';

// EN
import enCommon from './locales/en/common.json';
import enHome from './locales/en/home.json';
import enSites from './locales/en/sites.json';
import enServices from './locales/en/services.json';
import enDoctors from './locales/en/doctors.json';
import enEvents from './locales/en/events.json';
import enJobs from './locales/en/jobs.json';
import enNewborns from './locales/en/newborns.json';
import enPatientInfo from './locales/en/patient-info.json';
import enUrgences from './locales/en/urgences.json';
import enAppointments from './locales/en/appointments.json';
import enContact from './locales/en/contact.json';
import enSearch from './locales/en/search.json';
import enAuth from './locales/en/auth.json';

// DE
import deCommon from './locales/de/common.json';
import deHome from './locales/de/home.json';
import deSites from './locales/de/sites.json';
import deServices from './locales/de/services.json';
import deDoctors from './locales/de/doctors.json';
import deEvents from './locales/de/events.json';
import deJobs from './locales/de/jobs.json';
import deNewborns from './locales/de/newborns.json';
import dePatientInfo from './locales/de/patient-info.json';
import deUrgences from './locales/de/urgences.json';
import deAppointments from './locales/de/appointments.json';
import deContact from './locales/de/contact.json';
import deSearch from './locales/de/search.json';
import deAuth from './locales/de/auth.json';

// IT
import itCommon from './locales/it/common.json';
import itHome from './locales/it/home.json';
import itSites from './locales/it/sites.json';
import itServices from './locales/it/services.json';
import itDoctors from './locales/it/doctors.json';
import itEvents from './locales/it/events.json';
import itJobs from './locales/it/jobs.json';
import itNewborns from './locales/it/newborns.json';
import itPatientInfo from './locales/it/patient-info.json';
import itUrgences from './locales/it/urgences.json';
import itAppointments from './locales/it/appointments.json';
import itContact from './locales/it/contact.json';
import itSearch from './locales/it/search.json';
import itAuth from './locales/it/auth.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: {
        common: frCommon, home: frHome, sites: frSites, services: frServices,
        doctors: frDoctors, events: frEvents, jobs: frJobs, newborns: frNewborns,
        'patient-info': frPatientInfo, urgences: frUrgences, appointments: frAppointments,
        contact: frContact, search: frSearch, auth: frAuth,
      },
      en: {
        common: enCommon, home: enHome, sites: enSites, services: enServices,
        doctors: enDoctors, events: enEvents, jobs: enJobs, newborns: enNewborns,
        'patient-info': enPatientInfo, urgences: enUrgences, appointments: enAppointments,
        contact: enContact, search: enSearch, auth: enAuth,
      },
      de: {
        common: deCommon, home: deHome, sites: deSites, services: deServices,
        doctors: deDoctors, events: deEvents, jobs: deJobs, newborns: deNewborns,
        'patient-info': dePatientInfo, urgences: deUrgences, appointments: deAppointments,
        contact: deContact, search: deSearch, auth: deAuth,
      },
      it: {
        common: itCommon, home: itHome, sites: itSites, services: itServices,
        doctors: itDoctors, events: itEvents, jobs: itJobs, newborns: itNewborns,
        'patient-info': itPatientInfo, urgences: itUrgences, appointments: itAppointments,
        contact: itContact, search: itSearch, auth: itAuth,
      },
    },
    fallbackLng: 'fr',
    defaultNS: 'common',
    ns: [
      'common', 'home', 'sites', 'services', 'doctors', 'events', 'jobs',
      'newborns', 'patient-info', 'urgences', 'appointments', 'contact', 'search', 'auth',
    ],
    interpolation: { escapeValue: false },
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
    },
  });

export default i18n;
