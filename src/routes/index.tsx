import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LocaleLayout } from '@/layouts/LocaleLayout';
import { MainLayout } from '@/layouts/MainLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { LoadingSpinner } from '@/shared/components/LoadingSpinner';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';

// Lazy-loaded pages
const HomePage = lazy(() => import('@/features/home/pages/HomePage'));
const UrgencesPage = lazy(() => import('@/features/urgences/pages/UrgencesPage'));
const AppointmentsPage = lazy(() => import('@/features/appointments/pages/AppointmentsPage'));
const ServicesListPage = lazy(() => import('@/features/services/pages/ServicesListPage'));
const ServiceDetailPage = lazy(() => import('@/features/services/pages/ServiceDetailPage'));
const SitesPage = lazy(() => import('@/features/sites/pages/SitesPage'));
const SiteDetailPage = lazy(() => import('@/features/sites/pages/SiteDetailPage'));
const EventsListPage = lazy(() => import('@/features/events/pages/EventsListPage'));
const EventDetailPage = lazy(() => import('@/features/events/pages/EventDetailPage'));
const NewbornsPage = lazy(() => import('@/features/newborns/pages/NewbornsPage'));
const ContactPage = lazy(() => import('@/features/contact/pages/ContactPage'));
const PatientInfoListPage = lazy(() => import('@/features/patient-info/pages/PatientInfoListPage'));
const PatientInfoDetailPage = lazy(() => import('@/features/patient-info/pages/PatientInfoDetailPage'));
const JobsPage = lazy(() => import('@/features/jobs/pages/JobsPage'));
const JobCategoryPage = lazy(() => import('@/features/jobs/pages/JobCategoryPage'));
const DoctorsPage = lazy(() => import('@/features/doctors/pages/DoctorsPage'));
const SearchResultsPage = lazy(() => import('@/features/search/pages/SearchResultsPage'));
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'));
const ForgotPasswordPage = lazy(() => import('@/features/auth/pages/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('@/features/auth/pages/ResetPasswordPage'));
const NotFoundPage = lazy(() => import('@/features/static/pages/NotFoundPage'));

function wrap(element: React.ReactNode) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        {element}
      </Suspense>
    </ErrorBoundary>
  );
}

export const router = createBrowserRouter([
  /* Root → redirect to default locale */
  { path: '/', element: <Navigate to="/fr" replace /> },

  /* All pages under /:locale */
  {
    path: '/:locale',
    element: wrap(<LocaleLayout />),
    children: [
      {
        element: wrap(<MainLayout />),
        children: [
          /* Homepage */
          { index: true, element: wrap(<HomePage />) },

          /* Urgences */
          { path: 'urgences', element: wrap(<UrgencesPage />) },

          /* Prise de rendez-vous */
          { path: 'prise-de-rendez-vous', element: wrap(<AppointmentsPage />) },

          /* Prestations / Services */
          { path: 'prestations', element: wrap(<ServicesListPage />) },
          { path: 'prestations/:slug', element: wrap(<ServiceDetailPage />) },

          /* Sites / Accès */
          { path: 'acces', element: wrap(<SitesPage />) },
          { path: 'acces/:slug', element: wrap(<SiteDetailPage />) },

          /* Agenda / Events */
          { path: 'agenda', element: wrap(<EventsListPage />) },
          { path: 'agenda/:slug', element: wrap(<EventDetailPage />) },

          /* Bébés en ligne / Newborns */
          { path: 'bebes-en-ligne', element: wrap(<NewbornsPage />) },

          /* Contact */
          { path: 'contact', element: wrap(<ContactPage />) },

          /* Espace Patient-e */
          { path: 'espace-patient', element: wrap(<PatientInfoListPage />) },
          { path: 'espace-patient/:slug', element: wrap(<PatientInfoDetailPage />) },

          /* Espace Emploi / Jobs */
          { path: 'espace-emploi', element: wrap(<JobsPage />) },
          { path: 'espace-emploi/:category', element: wrap(<JobCategoryPage />) },

          /* Doctors */
          { path: 'medecins', element: wrap(<DoctorsPage />) },

          /* Search */
          { path: 'recherche', element: wrap(<SearchResultsPage />) },

          /* 404 */
          { path: '*', element: wrap(<NotFoundPage />) },
        ],
      },
      /* Auth (no main layout chrome) */
      {
        path: 'auth',
        element: wrap(<AuthLayout />),
        children: [
          { path: 'login', element: wrap(<LoginPage />) },
          { path: 'forgot-password', element: wrap(<ForgotPasswordPage />) },
          { path: 'reset-password', element: wrap(<ResetPasswordPage />) },
        ],
      },
    ],
  },

  /* Catch-all 404 */
  { path: '*', element: wrap(<NotFoundPage />) },
]);
