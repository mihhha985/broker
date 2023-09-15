import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LightweightCharts from '@/component/lightweightCharts/LightweightCharts';
import GlassQuotes from '@/component/glassQuotes/GlassQuotes';

export default function Page({ params }: { params: { alias: string } }) {
  
  return (
    <Box sx={{margin:"2rem"}}>
       <Breadcrumbs 
        sx={{marginBottom:"1rem"}}
        aria-label="breadcrumb">
        <Link href="/">
          Main
        </Link>
        <Typography color="text.primary">{params.alias}</Typography>
      </Breadcrumbs>
      <Grid
        gap={2} 
        alignItems={'center'}
        justifyContent={'space-between'}
        container>
        <Grid minWidth={'800px'}item>
          <LightweightCharts name={params.alias} />
        </Grid>
        <Grid item>
          <GlassQuotes name={params.alias} />
        </Grid>
      </Grid>
    </Box>
  );
}
