exports.handler = async (event) => {
    // 增加详细日志，方便排查问题
    console.log("收到请求，headers:", event.headers);
    console.log("收到请求，body:", event.body);

    // 检查请求方法
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Method Not Allowed" })
        };
    }

    try {
        // 解析请求体
        const body = JSON.parse(event.body);
        const text = body.text;

        if (!text) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Text is required" })
            };
        }

        // 模拟API调用，返回测试数据（先跳过真实API，排查函数本身问题）
        const mockResponse = {
            success: true,
            inputText: text,
            message: "✅ 函数运行正常！API调用部分已跳过，请检查环境变量VOLC_ARK_KEY是否正确配置。"
        };

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(mockResponse)
        };

    } catch (error) {
        console.error("函数执行错误:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Server error", details: error.message })
        };
    }
};
