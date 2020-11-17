import { sqlPool, sqlPoolConnect } from './connect_sql.js'

const execSQL = async (tarolteljaras, params) => {
    const xmljsonstr = 'F52E2B61-18A1-11d1-B105-00805F49916B'
    try {
        await sqlPoolConnect
        const request = sqlPool.request()
        tarolteljaras == 'alkalmazas_teparameter'
            ? request.input('tarolteljaras', params.tarolteljaras)
            : params &&
              Object.keys(params).map((key) => {
                  request.input(key, params[key])
              })
        const result = await request.execute('te_' + tarolteljaras)
        if (result) {
            const firstresult = result.recordset[0]
            if (result.recordset.length > 0) {
                if (firstresult['XML_' + xmljsonstr]) {
                    return { success: true, data: firstresult['XML_' + xmljsonstr] }
                } else if (firstresult['JSON_' + xmljsonstr]) {
                    return { success: true, data: firstresult['JSON_' + xmljsonstr] }
                } else {
                    return { success: true, data: result.recordset }
                }
            } else return { success: true, data: null }
        }
    } catch (err) {
        console.error('SQL error in execSQL', err)
        return { success: false, error: err }
    }
}

const rwsql = {
    getSQLDataFromTE: async (te, allParams) => {
        try {
            const colsResp = await execSQL('alkalmazas_teparameter', { tarolteljaras: te })
            if (!colsResp.success) return { success: false, error: err }
            let params
            if (colsResp.success && colsResp.data) {
                // ha sikeres volt a hívás és van is paraméter
                params = {}
                const cols = colsResp.data.filter((col) => col.name)
                cols.forEach((col) => {
                    const colname = col.name
                    params[colname] = allParams[colname] // TODO kezelni ha nen jön ilyen paraméter!!!
                })
            }
            const sqlvalasz = await execSQL(te, params)
            return sqlvalasz //.success ? { success: true, data: sqlvalasz.data } : { success: false, error: sqlvalasz.error }
        } catch (err) {
            console.log('SQL hiba rwsql-ben')
            return { success: false, error: err }
        }
    },
}

export default rwsql
// module.exports = rwsql
