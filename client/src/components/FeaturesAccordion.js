import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
  backgroundColor: '#1976d2',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function SimpleAccordion() {
  return (
    <div>
      <Accordion>
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <Typography color="white">Create a record of your climbs!</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Create a digital record of your climbs complete with photos, videos, descriptions, ratings, and more! This
            allows you to look back at the climbs that you've done, their difficulty, and how much you enjoyed them
            while also keeping all of their related media in one spot.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary aria-controls="panel2a-content" id="panel2a-header">
          <Typography color="white">Share climbing with your friends!</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Share your passion with your friends and fellow climbers. ClimBlog allows you to view your friends' posts
            and see what they've been pulling on recently!
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary aria-controls="panel3a-content" id="panel3a-header">
          <Typography color="white">Track your progress!</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Track your progress over time and look back on the problems that caused you trouble in the past. See your
            progression and highlight your strengths and weaknesses throughout your climbing career.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary aria-controls="panel4a-content" id="panel4a-header">
          <Typography color="white">Find the best climbs and the best gyms!</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Find the best climbs at your local gym or outdoors near you. See where your friends have been climbing and
            where they want to go next!
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
