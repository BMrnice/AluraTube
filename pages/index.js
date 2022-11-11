import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/TimeLine";

import { videoService } from "../src/components/Menu/componentes/services/videoService";



function HomePage() {
    const service = videoService();
    const estilosDaHomePage = { backgroundColor: "" };
    const [valorDoFiltro, setValorDoFiltro] =React.useState ("");
    const [playlists, setPlaylists] = React.useState({ });
    
    React.useEffect(() => {
        console.log("useEffect");
        service
        .getAllVideos()
        .then((dados) => {
            console.log(dados.data);
            const novasPlaylists = { ...playlists };
            dados.data.forEach((video) => {
                if (!novasPlaylists[video.playlists]) {
                    novasPlaylists[video.playlists] = []
                }
                novasPlaylists[video.playlists].push(video);

            })
            setPlaylists(novasPlaylists);
        });
       

    },[]);


    return (
        <>
            <div style={estilosDaHomePage}>
                {/* {props drilling} */}
                <Menu  valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro}/>
                <Header />
                <TimeLine searchValue={valorDoFiltro} playLists={config.playLists} />
                
            </div>
        </>
        
    )
};

export default HomePage


const StyledBanner = styled.div`
    //background-image: url(${config.banner});
    background-image: url(${({bg})=>bg}); // Aqui esta sendo passado o valor por referencia de props usando arrowfunction 
    height: 490px;
    width: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    
`;

const StyledHeader = styled.div`
        background-color: ${({ theme })=> theme.backgroundLevel1};

         img {
        width: 100%;
        height: 70vh;
        box-shadow: 1px 1px 9px 1px ;
        box-shadow: ${({ theme }) => theme.backgroundLevel1 || "#ffffff"};
    }
    .user-info{
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
        box-shadow: 2px 2px 3px black;
    }
    .user-info > img {
        width: 80px;
        height: 80px;
        border-radius: 30%;
    }
  `;
function Header() {

    return (
        <StyledHeader>
            <StyledBanner bg={config.banner}/>
            <section className="user-banner" >
                {/* <img src={config.banner} /> */}
                
            </section>
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>

            </section>
        </StyledHeader>
    )
};



function TimeLine({searchValue, ...props}) {
    //console.log("escreve ", props)
    const playListNames = Object.keys(props.playLists)
    //statement
    // retorno por expressao
    return (
        <StyledTimeline>
            {playListNames.map(playListNames => {
                const videos = props.playLists[playListNames]
                return (
                    <section key={playListNames}>
                        <h2>{playListNames}</h2>
                        <div>
                            {videos.filter((video)=>{
                                const titleNormalized= video.title.toLowerCase();
                                const searchValueNormalized= searchValue.toLowerCase();
                                return titleNormalized.includes(searchValueNormalized)
                            }).map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
};