const url = 'http://localhost:8080/api/'

/*Rotas de Login */
export function loginUser(data: object){
  return {
    url: `${url}user/login`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    },
  }
}

export function createUser(data: object){
  return{
    url: `${url}user/create`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    },
  }
}

export function changePass(data: object){
  return{
    url: `${url}user/forget-password`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    },
  }
}

export function validUser(data: object){
  return{
    url: `${url}user/valid-token`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    },
  }
}


/* Rotas de Polls */
export function getAllData() {
  return {
    url: `${url}polls/get-all`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorizarion": localStorage.getItem('token'),
      },
    },
  }
}

export function getUserPolls(userId: number) {
  return {
    url: `${url}polls/${userId}/get-my-polls`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorizarion": localStorage.getItem('token'),
      },
    },
  }
}

export function getOnePoll(pollId: number) {
  return {
    url: `${url}polls/${pollId}`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorizarion": localStorage.getItem('token'),
      },
    },
  }
}