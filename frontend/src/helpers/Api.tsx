const url = 'http://localhost:8080/api/'

/*Rotas de Login */
export function loginUser(data: object) {
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

export function createUser(data: object) {
  return {
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

export function changePass(data: object) {
  return {
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

export function validUser(data: string) {
  return {
    url: `${url}user/valid-token`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorizarion": `${data}`
      },
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

export function createPoll(userId: number, value: object) {
  return {
    url: `${url}polls/${userId}/create`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorizarion": localStorage.getItem('token'),
      },
      body: JSON.stringify(value)
    },
  }
}

export function editPoll(userId: number, pollId: number, value: object) {
  return {
    url: `${url}polls/${userId}/${pollId}/edit`,
    options: {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authorizarion": localStorage.getItem('token'),
      },
      body: JSON.stringify(value)
    },
  }
}

export function deletePoll(pollId: number) {
  return {
    url: `${url}polls/${pollId}/delete`,
    options: {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "authorizarion": localStorage.getItem('token'),
      },
    },
  }
}

/* Rotas de Answers */
export function answerPoll(pollId: number, userId: number, option_resp: number) {
  return {
    url: `${url}polls/${userId}/${pollId}/answer`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorizarion": localStorage.getItem('token'),
      },
      body: JSON.stringify({ option_resp })
    },
  }
}

export function getDataAnswerPoll(pollId: number) {
  return {
    url: `${url}polls/${pollId}/get-resp`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorizarion": localStorage.getItem('token'),
      },
    },
  }
}