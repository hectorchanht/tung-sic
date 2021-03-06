
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react';
import { useLocale } from '../utils/hooks';

const faqsLength = 8;

const FAQ = () => {
  const loc = useLocale();
  const faqList = Array.from({ length: faqsLength }, (_, i) => [loc.get(`faq-q${i + 1}`), loc.get(`faq-a${i + 1}`)]);

  return (
    <Box>
      <Accordion allowMultiple>
        {faqList.map(([q, a], i) => (
          <AccordionItem key={i}>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  {q}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} ml={4}>{a}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  )
}

export default FAQ;
