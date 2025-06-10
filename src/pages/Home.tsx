import React, { useEffect, useState } from 'react';
import Logout from "../components/auth/Logout";
import Center from "../components/utils/Center";
import { db } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";

import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import ViewAgendaOutlined from "@mui/icons-material/ViewAgendaOutlined";

import { AppBar, Toolbar, Typography, Container, Box, TextField, Button, Grid } from "@mui/material";

import {
  collection, 
  query,
  onSnapshot,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

interface Props {}

interface Todo {
  id: string;
  subject: string;
  isCompleted: boolean;
}

const Home = ({}: Props) => {
  useEffect(() => {}, []); // eslint-disable-line react-hooks/exhaustive-deps
  const navigate = useNavigate();

  const [subject, setSubject] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  
  const addSubmit = async () => {
    console.info("add: " + subject);
    if (subject !== "") {
      await addDoc(collection(db, "todos"), {
        subject,
        completed: false,
      });
      setSubject("");
    }
  }

  const updateTodo = async (id: string, completed: boolean) => {
    const userDoc = doc(db, "todos", id);
    const newFields = { completed: !completed };
    await updateDoc(userDoc, newFields);
  };

  const deleteTodo = async (id: string) => {
    const userDoc = doc(db, "todos", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
      const updatedTodos = snapshot.docs.map((doc) => ({
        id: doc.id,
        subject: doc.data().subject as string,
        isCompleted: doc.data().completed as boolean,
      }));
      setTodos(updatedTodos);
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <Container sx={{ mb: 8 }}>
        <Box
          display={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          width={"90vw"}
          maxWidth={"400px"}
          boxShadow={2}
          margin={3}
          sx={{
            backgroundColor: '#FFF3E0',
            padding: 2,
            borderRadius: 2,
            border: '1px solid #FFB74D'
          }}
        >
          <TextField 
            error={false}
            fullWidth 
            id="outlined-search" 
            label="New To Do" 
            type="search" 
            placeholder='what do you want to do?'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#FB8C00',
                },
              },
            }}
          />

          <Button 
            onClick={addSubmit}
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#FB8C00',
              '&:hover': {
                backgroundColor: '#F57C00',
              },
              marginTop: 1
            }}
          >
            Add-Todo
          </Button>
        </Box>

        {todos.map((todo) => {
          const cardTheme = todo.isCompleted ? {
            bgcolor: '#E8F5E9',
            border: '1px solid #66BB6A',
          } : {
            bgcolor: '#E3F2FD',
            border: '1px solid #42A5F5',
          };

          return (
            <Box
              key={todo.id}
              display="flex"
              alignItems="center"
              boxShadow={2}
              margin={3}
              width={"90vw"}
              maxWidth={"400px"}
              sx={{
                ...cardTheme,
                borderRadius: 2,
                padding: 2,
                transition: 'all 0.3s ease'
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                flex={1}
                gap={1}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: todo.isCompleted ? '#2E7D32' : '#1976D2',
                    fontWeight: 'medium',
                    fontSize: '0.5rem'
                  }}
                >
                  Status: {todo.isCompleted ? 'Done' : 'In Progress'}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: todo.isCompleted ? '#2E7D32' : '#1976D2',
                    fontWeight: 'medium',
                    fontSize: '1.2rem'
                  }}
                >
                  {todo.subject}
                </Typography>
              </Box>
              <Grid container direction="column" spacing={0.5} sx={{ maxWidth: '40px', marginLeft: 1 }}>
                <Grid item>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      backgroundColor: todo.isCompleted ? '#66BB6A' : '#42A5F5',
                      '&:hover': {
                        backgroundColor: todo.isCompleted ? '#4CAF50' : '#1E88E5',
                      },
                      minWidth: '32px',
                      padding: '4px',
                      '& .MuiSvgIcon-root': {
                        fontSize: '1rem'
                      }
                    }}
                    onClick={() => navigate(`/todos/${todo.id}`)}
                  >
                    <ViewAgendaOutlined />
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    onClick={() => {
                      updateTodo(todo.id, todo.isCompleted);
                    }}
                    fullWidth
                    variant="contained"
                    sx={{
                      backgroundColor: todo.isCompleted ? '#66BB6A' : '#42A5F5',
                      '&:hover': {
                        backgroundColor: todo.isCompleted ? '#4CAF50' : '#1E88E5',
                      },
                      minWidth: '32px',
                      padding: '4px',
                      '& .MuiSvgIcon-root': {
                        fontSize: '1rem'
                      }
                    }}
                  >
                    <EditIcon />
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    onClick={() => {
                      deleteTodo(todo.id);
                    }}
                    fullWidth
                    variant="contained"
                    color="error"
                    sx={{
                      minWidth: '32px',
                      padding: '4px',
                      '& .MuiSvgIcon-root': {
                        fontSize: '1rem'
                      }
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )
        })}
      </Container>
    </>
  )}

export default Home