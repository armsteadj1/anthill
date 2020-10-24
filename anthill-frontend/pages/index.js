import Head from 'next/head'
import styles from '../styles/Home.module.css'
import useSWR from "swr";
import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

const fetcher = (...args) => fetch(...args).then(res => res.json());

const useStyles = makeStyles((theme) => {
  console.log(theme.typography.h1)
  return ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    smallText: {
      fontSize: "1.5rem"
    },
    bigText: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 300,
      fontSize: '6rem',
      lineHeight: 1.167,
      letterSpacing: '-0.01562em'
    }
  })
});

export default function Home() {
  const classes = useStyles();
  const [isLive, setIsLive] = useState(false);
  const { data } = useSWR('/api', fetcher, { refreshInterval: isLive ? 1000 : 0 });
  const { data: sensorData } = useSWR('/api/sensors', fetcher, { refreshInterval: 5000 });
  const clear = () => fetch("/api/clear");
  const connectSensors = () => fetch("/api/connect");
  const disconnectSensors = () => fetch("/api/disconnect");

  const { threeSecond, twentyMinute } = data ? data : {};

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>

      <AppBar position="static">
        <Toolbar>

          <Typography variant="h6" className={classes.title}>
            🔌
          </Typography>

          <Button color="inherit" onClick={() => setIsLive(!isLive)}>{isLive ? "Stop" : "Start"}</Button>
          <Button color="inherit" onClick={clear}>Clear</Button>
          <Button color="inherit" onClick={connectSensors}>Connect Sensors</Button>
          <Button color="inherit" onClick={disconnectSensors}>Disconnect Sensors</Button>
        </Toolbar>
      </AppBar>

      <Container className={styles.main}>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12} md={6}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h3" component="h2">
                    3s
                  </Typography>
                  <Box mt={4}>
                  <Grid container className={classes.root} spacing={2} alignContent="center">
                  <Grid item xs={6}>
                    <Typography variant="h2" align="center">
                      {!data ? "??" :  (Math.round(threeSecond * 100) / 100).toFixed(0)} <small><small>w</small></small>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h2" align="center">
                      {!data ? "??" : (Math.round(threeSecond / 68 * 100) / 100).toFixed(2)} <small><small>w/kg</small></small>
                    </Typography>
                  </Grid>
                  </Grid>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h3" component="h2">
                    20m
                  </Typography>
                  <Box mt={4}>
                  <Grid container className={classes.root} spacing={2} alignContent="center">
                    <Grid item xs={6}>
                      <Typography variant="h2" align="center">
                        {!data ? "??" : (Math.round(twentyMinute * 100) / 100).toFixed(0)} <small><small>w</small></small>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h2" align="center">
                        {!data ? "??" : (Math.round(twentyMinute / 68 * 100) / 100).toFixed(2)} <small><small>w/kg</small></small>
                      </Typography>
                    </Grid>
                  </Grid>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>

        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12} md={6}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h3" component="h2">
                    Sensors
                  </Typography>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="center">Id</TableCell>
                        <TableCell align="center">Connected?</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sensorData && sensorData.map((sensor) => (
                        <TableRow key={sensor.name}>
                          <TableCell component="th" scope="row">
                            {sensor.name}
                          </TableCell>
                          <TableCell align="center">{sensor.id}</TableCell>
                          <TableCell align="center">{sensor.connected ? "Yes" : "No"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
