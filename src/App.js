import './App.css';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


function App() {

    const [avatar, setAvatar] = useState("");
    const [username, setUsername] = useState("");
    const [respoData, setRespoData] = useState("");


    async function repoDataUrl() {
        try {
            // const resp = await fetch("https://api.github.com/users/Alvaro---/repos/") // get REPOS
            const resp = await fetch("https://api.github.com/repos/Alvaro---/nesttest/commits") //GET COmmits
            const res = await resp.json();
            console.log(res)
            console.log(res[0].git_commits_url)
            const list = res.map(item => (
                <div className='text-center'>
                    <a target="_blank" href={item.svn_url}>
                        {item.name}
                    </a>
                </div>
            ));
            setRespoData(list)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetch("https://api.github.com/users/Alvaro---")
            .then(resp => resp.json())
            .then(res => {
                console.log(res)
                setAvatar(res.avatar_url)
                setUsername(res.login)
            })
            .catch(console.log)
    }, [])

    return (
        <div className="App w-100 min-vh-100 justify-content-center align-items-center d-flex d-flex flex-column">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={avatar} />
                <Card.Body>
                    <Card.Title>{username}</Card.Title>
                    <Button variant="primary" onClick={repoDataUrl}>Go somewhere</Button>
                </Card.Body>
            </Card>
            {respoData}
        </div>
    );
}

export default App;
