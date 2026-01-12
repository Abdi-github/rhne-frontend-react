import { useState } from 'react';
import Container from '@mui/material/Container';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { HeroSection } from '@/shared/components/HeroSection';
import { SEOHead } from '@/shared/components/SEOHead';
import {
  useGetAppointmentTypesQuery,
  useGetAppointmentSlotsQuery,
  useCreateBookingMutation,
} from '../appointments.api';
import { useNotification } from '@/shared/hooks/useNotification';
import { useLocalePath } from '@/shared/hooks/useLocalePath';
import { localizeField } from '@/shared/utils/localizeField';
import { AppointmentTypeSelector } from '../components/AppointmentTypeSelector';
import { SlotPicker } from '../components/SlotPicker';
import { PatientInfoForm } from '../components/PatientInfoForm';
import { BookingSummary } from '../components/BookingSummary';
import { BookingConfirmation } from '../components/BookingConfirmation';
import { BookingLookup } from '../components/BookingLookup';
import type { BookingPayload } from '../appointments.types';

const STEPS_KEYS = ['select_type', 'select_slot', 'patient_info', 'review', 'confirmation'] as const;

export default function AppointmentsPage() {
  const { t } = useTranslation('appointments');
  const { locale } = useLocalePath();
  const notification = useNotification();

  const [tabIndex, setTabIndex] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedTypeId, setSelectedTypeId] = useState('');
  const [selectedAppointmentType, setSelectedAppointmentType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [bookingRef, setBookingRef] = useState('');
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    reason: '',
  });

  const { data: typesData, isLoading: typesLoading } = useGetAppointmentTypesQuery();
  const { data: slotsData, isLoading: slotsLoading } = useGetAppointmentSlotsQuery(
    { appointment_type: selectedAppointmentType, date: selectedDate },
    { skip: !selectedAppointmentType || !selectedDate },
  );
  const [createBooking, { isLoading: booking }] = useCreateBookingMutation();

  const breadcrumbs = [
    { label: t('common:breadcrumb.home'), href: '/' },
    { label: t('title') },
  ];

  const steps = STEPS_KEYS.map((key) => t(`steps.${key}`));

  const types = typesData?.data ?? [];
  const slots = slotsData?.data ?? [];

  // Get localized name of selected appointment type
  const selectedTypeName = types.find((t) => t._id === selectedTypeId);
  const appointmentTypeName = selectedTypeName
    ? localizeField(selectedTypeName.title, locale)
    : '';

  const handleSelectType = (typeId: string, appointmentType: string) => {
    setSelectedTypeId(typeId);
    setSelectedAppointmentType(appointmentType);
    setSelectedDate('');
    setSelectedSlot('');
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedSlot('');
  };

  const handleBook = async () => {
    try {
      const payload: BookingPayload = {
        appointment_id: selectedTypeId,
        preferred_date: selectedDate,
        preferred_time_slot: selectedSlot,
        reason: form.reason,
        patient_info: {
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          phone: form.phone,
          date_of_birth: form.date_of_birth,
        },
      };
      const result = await createBooking(payload).unwrap();
      setBookingRef(result.data.booking_reference);
      setActiveStep(4);
      notification.success(t('booking_success'));
    } catch {
      notification.error(t('booking_error'));
    }
  };

  const handleFormChange = (field: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleBookAnother = () => {
    setActiveStep(0);
    setSelectedTypeId('');
    setSelectedAppointmentType('');
    setSelectedDate('');
    setSelectedSlot('');
    setBookingRef('');
    setForm({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      date_of_birth: '',
      reason: '',
    });
  };

  return (
    <>
      <SEOHead title={t('hero_title')} />
      <HeroSection title={t('hero_title')} breadcrumbs={breadcrumbs} />
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Tabs: Book / My Appointment */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabIndex} onChange={(_, v) => setTabIndex(v)}>
            <Tab label={t('tab_book')} />
            <Tab label={t('tab_my_appointment')} />
          </Tabs>
        </Box>

        {/* Tab 0: Booking flow */}
        {tabIndex === 0 && (
          <>
            <Stepper activeStep={activeStep} sx={{ mb: 4 }} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}><StepLabel>{label}</StepLabel></Step>
              ))}
            </Stepper>

            {activeStep === 0 && (
              <AppointmentTypeSelector
                types={types}
                isLoading={typesLoading}
                selectedType={selectedTypeId}
                onSelect={handleSelectType}
                onNext={() => setActiveStep(1)}
              />
            )}

            {activeStep === 1 && (
              <SlotPicker
                slots={slots}
                isLoading={slotsLoading}
                selectedSlot={selectedSlot}
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
                onSelect={setSelectedSlot}
                onBack={() => setActiveStep(0)}
                onNext={() => setActiveStep(2)}
              />
            )}

            {activeStep === 2 && (
              <PatientInfoForm
                form={form}
                onChange={handleFormChange}
                onBack={() => setActiveStep(1)}
                onSubmit={() => setActiveStep(3)}
                isSubmitting={false}
                appointmentType={selectedAppointmentType}
              />
            )}

            {activeStep === 3 && (
              <BookingSummary
                appointmentTypeName={appointmentTypeName}
                selectedDate={selectedDate}
                selectedSlot={selectedSlot}
                form={form}
                onBack={() => setActiveStep(2)}
                onConfirm={handleBook}
                isSubmitting={booking}
              />
            )}

            {activeStep === 4 && (
              <BookingConfirmation
                referenceNumber={bookingRef}
                appointmentTypeName={appointmentTypeName}
                selectedDate={selectedDate}
                selectedSlot={selectedSlot}
                patientName={`${form.first_name} ${form.last_name}`}
                onBookAnother={handleBookAnother}
              />
            )}
          </>
        )}

        {/* Tab 1: Booking lookup & cancellation */}
        {tabIndex === 1 && (
          <BookingLookup />
        )}
      </Container>
    </>
  );
}
