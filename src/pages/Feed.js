import React from 'react'
import ExperienceCard from '../components/experienceCard/experienceCard';
import Stack from '@mui/material/Stack';

const Feed = () => {
  return (
    <Stack
    direction="column"
    justifyContent="flex-start"
    alignItems="center"
    spacing={2}
    mt={2}
    >
      <ExperienceCard/>
      <ExperienceCard/>
      <ExperienceCard/>
      <ExperienceCard/>
      <ExperienceCard/>
      <ExperienceCard/>
      <ExperienceCard/>
      <ExperienceCard/>
      <div></div>
    </Stack>
  )
}

export default Feed