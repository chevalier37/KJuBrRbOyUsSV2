//let p = null

navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;

function bindEvents(p){
    
    p.on('error', function(err){
        console.log('error', err)
    })
    
    p.on('signal', function(data){
        document.querySelector('#offer').textContent = JSON.stringify(data)
    })

    p.on('stream', function(stream){
        let receiverVideo = document.querySelector('#receiver-video')
        //receiverVideo.volume = 0
        receiverVideo.src = window.URL.createObjectURL(stream)
        receiverVideo.play()
    })

    document.querySelector('#incoming').addEventListener('submit', function(e){
        e.preventDefault()
        // if (p == null)
        // {
        //     p = new SimplePeer({
        //         initiator: false,
        //         trickle: false
        //     })
        // }
        p.signal(JSON.parse(e.target.querySelector('textarea').value))
        bindEvents(p)
    })
}

function startPeer(initiator){
    navigator.getUserMedia({
        video: true,
        audio: true,
    }, function(stream){
            let p = new SimplePeer({
            initiator: initiator,
            stream: stream,
            trickle: false,
        })
        bindEvents(p)
        let emitterVideo = document.querySelector('#emitter-video')
        //emitterVideo.volume = 0
        console.log(stream)
        emitterVideo.src = window.URL.createObjectURL(stream)
        emitterVideo.play()
    }, function(){})
}

document.querySelector('#start').addEventListener('click', function(e){
    startPeer(true)
})

document.querySelector('#receive').addEventListener('click', function(e){
    startPeer(false)
})
