import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button, useColorMode } from '@chakra-ui/react';


const ThemeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button variant='ghost' onClick={toggleColorMode} aria-label={colorMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'} title={colorMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
      {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
    </Button>
  )
}

export default ThemeSwitch;
