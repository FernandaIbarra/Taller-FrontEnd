import { AboutMe } from "../model/aboutme";
import { Project } from "../model/project";


export const mockLogin = (userName: string, password: string) => new Promise<TokenResponse>(function (resolve, rejected) {
    setTimeout(() => {
        if (userName === "mafernandai05917@gmail.com" && password === "blackCat91") {
            resolve(JSON.parse(
                `{
                 "access_token" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOnsidXNlcklkIjo2NjYsInJvbGUiOiJhZG1pbiIsInVzZXJOYW1lIjoiYWRtaW4iLCJkaXNwbGF5TmFtZSI6ImFkbWluIn0sImlhdCI6MTYwMTAyNzU1MywibmJmIjoxNjAxMDI3NTUzLCJleHAiOjE2MDExMTM5NTN9.vHgVtxKGmwDDLLVuT63UBkP8xe4a9hH0B3kkCsAh7K8",
                 "expires_in": 3600,
                 "token_type": "bearer"
                 }`
            ));
        } else {
            rejected(new Unauthorized());
        }
    }, 2000);
    
})
export interface TokenResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
}
export interface ApiError {
    description?: string;
}
export class Unauthorized implements ApiError { }



export const mockAboutme = () => new Promise<AboutMe>(function (resolve, rejected) {
    setTimeout(() => {
        resolve(JSON.parse(
            `{
            "id":"12389asdfasf8",
            "name":"Maria Fernanda Ibarra",
            "birthday":	"5/09/1991",
            "nationality":"Costa Rica",
            "job":"Full Stack Developer",
            "github":"https://github.com/FernandaIbarra"
            }`
        ));
    }, 500);

});

export const mockProjects = () => new Promise<Project[]>(function (resolve, rejected) {
    setTimeout(() => {
        resolve(JSON.parse(
            `[
                {
                "id":"12349as8df90",
                "title":"Mobile Social Media app React",
                "description":"React app, using Javascript and react router",
                "version":"17.0.1",
                "link":"https://github.com/FernandaIbarra/react-mobile-app",
                "tag":"JavaScript, React",
                "timestamp":"765817712000"
                },
                {
                "id":"789asdfas89",
                "title":"Custom banner",
                "description":"Vanilla js project to create a custom image",
                "version":"4.0.3",
                "link":"https://github.com/FernandaIbarra/custom-banner",
                "tag":"JavaScript, Bootstraping",
                "timestamp":"765817712001"
                },
                {
                "id":"25634iuoasdf8",
                "title":"Studio Ghibli app",
                "description":"Angular app consuming Studio Ghobli public API.",
                "version":"1.2.3",
                "link":"https://github.com/FernandaIbarra/StudioGhibliApp-",
                "tag":"Angular, TypeScript",
                "timestamp":"765817712004"
                },
                {
                "id":"7890asdf890",
                "title":"MathApp",
                "description":"C# console application.",
                "version":"5.2.0",
                "link":"https://github.com/FernandaIbarra/MathAppTest",
                "tag":"C#, .NET",
                "timestamp":"765817712005"
                }
            ]`
        ));
    }, 500);
});