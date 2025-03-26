import axios from 'axios';

const handler = async (m, { conn }) => {
    const githubRepoURL = 'https://github.com/Tohidkhan6332/TOHID-AI';
    
    try {
        const match = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);
        if (!match) throw new Error('Invalid repository URL');
        
        const [_, username, repoName] = match;
        const { data: repoData } = await axios.get(`https://api.github.com/repos/${username}/${repoName}`);
        
        const formattedInfo = `
        🍑🍆 *TOHID-AI BOT* 💦☣
        
📂 *Repository:* ${repoData.name}
👤 *Owner:* ${repoData.owner.login}
⭐ *Stars:* ${repoData.stargazers_count}
🍴 *Forks:* ${repoData.forks_count}
🌐 *URL:* ${repoData.html_url}
📝 *Description:* ${repoData.description || 'No description available'}
        
🚀 *OUR REPOSITORY*
_Welcome To Tohid-Ai! 🤖✨_

OUR CHANNEL: https://whatsapp.com/channel/0029VaGyP933bbVC7G0x0i2T
OFFICIAL GROUP: https://chat.whatsapp.com/IqRWSp7pXx8DIMtSgDICGu
⚡ *DEPLOY TOHID-AI BOT NOW!*
\`\`\` USER FRIENDLY TOHID-AI BOT 💥 \`\`\`
        `.trim();

        const userProfilePic = await conn.profilePictureUrl(m.sender, 'image').catch(() => repoData.owner.avatar_url);

        await conn.sendMessage(m.chat, {
            text: formattedInfo,
            contextInfo: {
                externalAdReply: {
                    title: 'Tohid-Ai Bot Repository',
                    body: 'Click to visit GitHub',
                    thumbnailUrl: repoData.owner.avatar_url,
                    sourceUrl: repoData.html_url,
                    showAdAttribution: true
                }
            }
        });

        await conn.sendMessage(m.chat, {
            image: { url: userProfilePic },  
            caption: formattedInfo,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363207624903731@newsletter',
                    newsletterName: 'TOHID-AI BOT REPO💖',
                    serverMessageId: 143
                }
            }
        });
    } catch (error) {
        console.error(error);
        await conn.reply(m.chat, '❌ Error fetching repository information. Please try again later.', m);
    }
};

handler.help = ['script'];
handler.tags = ['main'];
handler.command = ['sc', 'repo', 'script'];

export default handler;
