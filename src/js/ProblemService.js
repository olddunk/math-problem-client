import axios from 'axios'
const url = 'api/problems/'

class ProblemService {
    static getProblems() {
        return new Promise((resolve, reject) => {
            axios.get(url)
                .then(res => {
                    const data = res.data
                    resolve(
                        data.map(problem => ({
                            ...problem,
                            createdAt: new Date(problem.createdAt)
                        }))
                    )
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    static insertProblem(problem) {
        return axios.post(url, problem)
    }

    static deleteProblem(id) {
        return axios.delete(`${url}${id}`)
    }
}

export default ProblemService