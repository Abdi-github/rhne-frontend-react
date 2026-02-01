import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

interface PageTabsProps {
  tabs: { label: string; id: string }[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export function PageTabs({ tabs, activeTab, onChange }: PageTabsProps) {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
      <Tabs
        value={activeTab}
        onChange={(_, v) => onChange(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          '& .MuiTab-root': {
            textTransform: 'uppercase',
            fontWeight: 600,
            color: 'primary.main',
            fontSize: '0.85rem',
          },
        }}
      >
        {tabs.map((tab) => (
          <Tab key={tab.id} label={tab.label} value={tab.id} />
        ))}
      </Tabs>
    </Box>
  );
}
