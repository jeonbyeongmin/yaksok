import { logOnBrowser } from 'common/utils/log';
import { useTranslation } from 'next-i18next';

import { Button, Icon, Text } from '@/components/primitive';
import { makeToast } from '@/components/primitive/Toast';

export function ShareButton() {
  const { t } = useTranslation(['common', 'event-page']);

  const handleShareButtonClick = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      makeToast({
        type: 'success',
        title: t('common:toast.copy-invite-link.title'),
        message: t('common:toast.copy-invite-link.message'),
      });
    } catch (error) {
      logOnBrowser(error);
    }
  };

  return (
    <Button
      onClick={handleShareButtonClick}
      variant='outline'
      colorScheme='gray'
      leftElement={<Icon name='share' size={16} />}
      radius='pill'
      size='sm'
      shadow
    >
      <Text content={t('event-page:button.invite')} size='sm' />
    </Button>
  );
}
