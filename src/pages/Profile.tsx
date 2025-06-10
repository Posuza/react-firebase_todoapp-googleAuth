import { 
    Box, 
    Avatar, 
    Typography, 
    Paper, 
    Container,
    Grid,
    Card,
    CardContent,
    Divider
} from '@mui/material'

const Profile = () => {
    return (
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Avatar 
              sx={{ 
                width: 120, 
                height: 120,
                bgcolor: 'primary.main'
              }}
            />
            <Typography variant="h4" fontWeight="bold">
              User Name
            </Typography>
            <Divider flexItem />
          
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="primary">
                      Personal Information
                    </Typography>
                    <Typography>Email: user@example.com</Typography>
                    <Typography>Member since: January 2024</Typography>
                  </CardContent>
                </Card>
              </Grid>
            
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="primary">
                      Statistics
                    </Typography>
                    <Typography>Total Todos: 42</Typography>
                    <Typography>Completed: 24</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    )
}

export default Profile