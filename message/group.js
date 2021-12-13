const {
	MessageType
} = require("@adiwajshing/baileys");
const fs = require("fs-extra")

const { getBuffer } = require('../lib/myfunc')
const { color, bgcolor } = require('../lib/color')

let setting = JSON.parse(fs.readFileSync('./setting.json'))

module.exports = welcome = async (Valkyrie, anu) => {
	    const welkom = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
	    const isWelcome = welkom.includes(anu.jid)
	    if (!isWelcome) return
		try {
			    mem = anu.participants[0]
			    console.log(anu)
                try {
               pic = await Valkyrie.getProfilePicture(mem)
                } catch (e) {
                pic = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
            try {
                pp_grup = await Valkyrie.getProfilePicture(anu.jid)
                } catch (e) {
                pp_grup = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
             }
            if (anu.action == 'add' && mem.includes(Valkyrie.user.jid)) {
            Valkyrie.sendMessage(anu.jid, 'Halo! Terima Kasih sudah Mengundangku, Jika ingin Menggunakan Bot, Tolong Jadikan Admin Ya, Ketik .menu', 'conversation')
            }
             if (anu.action == 'add' && !mem.includes(Valkyrie.user.jid)) {
             if (!welkom.includes(anu.jid)) return
                mdata = await Valkyrie.groupMetadata(anu.jid)
                memeg = mdata.participants.length
            	num = anu.participants[0]
               groupName = mdata.subject
                let v = Valkyrie.contacts[num] || { notify: num.replace(/@.+/, '') }
                anu_user = v.vname || v.notify || num.split('@')[0]
              teks = `Selamat Datang Kak *@${mem.split('@')[0]}*\n*➸ Welcome in group *${groupName}*\n*➸ Intro Dulu Kak*\n*➸ Nama :*\n*➸ Umur :* \n*➸ Hobi :*\n*➸ Jenis Kelamin :*\n*➸ Nomor :* ${mem.replace('@s.whatsapp.net', '')}\n*Semoga betah~~*`
              buff = await getBuffer(pic)
               Valkyrie.sendMessage(mdata.id, { contentText: `${teks}`, footerText: `Welcome Message By *ValkyrieX4·Team*`, buttons: [{buttonId: `.selamatdatang`,buttonText:{displayText: 'WELCOME KAK'},type:1},{buttonId: `.rules`,buttonText:{displayText:'RULES BOT'},type:1},{buttonId:`.infogrouup`,buttonText:{displayText:'INFO GROUP'},type:1}],headerType: 'LOCATION', locationMessage: { degreesLatitude: '', degreesLongitude: '', jpegThumbnail: buff, contextInfo: {"mentionedJid": [num]}}}, 'buttonsMessage')
		}
            if (anu.action == 'remove' && !mem.includes(Valkyrie.user.jid)) {
            if (!welkom.includes(anu.jid)) return
                mdata = await Valkyrie.groupMetadata(anu.jid)
            	num = anu.participants[0]
                let w = Valkyrie.contacts[num] || { notify: num.replace(/@.+/, '') }
                anu_user = w.vname || w.notify || num.split('@')[0]
                memeg = mdata.participants.length
                out = `Selamat Tinggal Kak @${num.split('@')[0]} Semoga Jasamu Tidak Tenang!`
               buff = await getBuffer(pic)
               Valkyrie.sendMessage(mdata.id, { contentText: `${out}`, footerText: `Left Message By *ValkyrieX4·Team*`, buttons: [{buttonId: `.bay`,buttonText:{displayText: 'BYE KAK👋'},type:1}],headerType: 'LOCATION', locationMessage: { degreesLatitude: '', degreesLongitude: '', jpegThumbnail: buff, contextInfo: {"mentionedJid": [num]}}}, 'buttonsMessage')
            }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	}
