export interface IImage{
    src: string,
    name?: string
}

export interface IVideo{
    title: string,
    video_url: string,
    thumbnail_url: string
}

export interface ICategoryContent{
    title: string,
    url: string,
    image_url: string,
    type: 'cartoon' | 'toon' | 'music' | 'comic',
    size: string
}

export interface IMember{
    name: string, 
    role: string
}