import fetch from 'node-fetch'

export default async function handler(req,res) {
    if(req.method !== 'POST') return res.status(405).json({code:405,msg:'Method not allowed'})
    const {text} = req.body
    if(!text) return res.json({code:400,msg:'缺少文案内容'})

    const API_KEY = process.env.VOLC_ARK_KEY
    const BASE_URL = 'https://ark.cn-beijing.volces.com/api/v3'

    try{
        const llmRes = await fetch(`${BASE_URL}/chat/completions`,{
            method:'POST',
            headers:{
                'Authorization':`Bearer ${API_KEY}`,
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                model:'doubao-pro',
                messages:[
                    {
                        role:'system',
                        content:'把用户中文文案拆成短视频分镜，输出纯JSON：[{"scene":"场景","en_text":"美式英文解说","img_prompt":"画面提示词"}]，不要多余文字'
                    },
                    {role:'user',content:text}
                ],
                temperature:0.3
            })
        })
        const llmData = await llmRes.json()
        const sceneList = JSON.parse(llmData.choices[0].message.content)
        return res.json({code:200,msg:'成功',sceneData:sceneList})
    }catch(err){
        return res.json({code:500,msg:err.message})
    }
}