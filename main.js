const loadingEl = document.getElementById('loading');
const resulttEl = document.getElementById('result');

async function getData(query, format, ytsearch) {
    const APIUrl = 'https://dev02-ydl-api.herokuapp.com/api/info';
    if (ytsearch) {
        const url = APIUrl + '?url=ytsearch:' + query + '&format=' + format
        const res = await fetch(url);
        const json = await res.json();
        return [json.info.entries[0], url];
    } else {
        const url = APIUrl + '?url=' + query + '&format=' + format
        const res = await fetch(url);
        const json = await res.json();
        return [json.info, url];
    }
};

document.getElementById('btn').addEventListener('click', async () => {
    resulttEl.classList.add('hidden');
    document.getElementById('audio').classList.add('hidden');
    document.getElementById('video').classList.add('hidden');
    document.getElementById('error').classList.add('hidden');
    document.getElementById('audio').src = '';
    document.getElementById('video').src = '';
    // show loading el
    loadingEl.classList.remove('hidden');
    // get url
    const query = document.getElementById('input').value;
    const format = document.getElementById('format').value;
    const ytsearch = document.getElementById('ytsearch').checked;
    const mediaType = () => {
        if (format === 'bestaudio') {
            return 'audio';
        } else if (format === 'bestvideo' || format === 'best') {
            return 'video';
        } else {
            return alert('please choose format');
        }
    };
    const data_set = await getData(query, format, ytsearch).catch(err => {
        document.getElementById('error').classList.remove('hidden');
        document.getElementById('errorTxt').innerHTML = err;
    });
    const data = data_set[0];
    const infoUrl = data_set[1];
    const url = data.url;
    const webpageUrl = data.webpage_url;
    const description = data.description;
    const thumb = data.thumbnail;
    const title = data.title;
    mediaEl = document.getElementById(mediaType());
    // set url to video and link
    document.getElementById('webpageUrl').href = webpageUrl;
    document.getElementById('infoUrl').href = infoUrl;
    document.getElementById('description').innerHTML = description;
    mediaEl.src = url;
    // set thumb
    document.getElementById('thumb').src = thumb;
    mediaEl.classList.remove('hidden');
    // set title
    document.getElementById('title').innerHTML = title;
    // hidden loading el
    loadingEl.classList.add('hidden');
    // show result
    resulttEl.classList.remove('hidden');
})