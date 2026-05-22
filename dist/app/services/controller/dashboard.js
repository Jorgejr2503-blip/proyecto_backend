"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
// Aquí importarías los modelos de solicitudes, testimonios y noticias
// cuando los tengas. Por ahora usamos datos simulados.
class DashboardController {
    getMetrics(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user; // Ya viene del middleware authenticate
            try {
                if (user.role === 'superadmin') {
                    // Superadmin ve métricas GLOBALES de todos los países
                    const metrics = {
                        role: 'superadmin',
                        // Cuando tengas los modelos reales, harías:
                        // pendingRequests: await RequestModel.countDocuments({ status: 'pending' }),
                        // publishedTestimonials: await TestimonialModel.countDocuments({ published: true }),
                        // activeNews: await NewsModel.countDocuments({ active: true }),
                        pendingRequests: 42,
                        publishedTestimonials: 18,
                        activeNews: 7,
                        breakdown_by_country: [
                            { country: 'Colombia', pending: 15 },
                            { country: 'México', pending: 27 },
                        ]
                    };
                    return res.status(200).json({ ok: true, metrics });
                }
                if (user.role === 'admin_pais' || user.role === 'editor') {
                    // Solo ven datos de SU país
                    const metrics = {
                        role: user.role,
                        country: user.country,
                        // pendingRequests: await RequestModel.countDocuments({ 
                        //   status: 'pending', country: user.country 
                        // }),
                        pendingRequests: 10,
                        publishedTestimonials: 5,
                        activeNews: 3,
                    };
                    return res.status(200).json({ ok: true, metrics });
                }
            }
            catch (error) {
                return res.status(500).json({ ok: false, error_message: 'Error obteniendo métricas' });
            }
            return;
        });
    }
}
exports.DashboardController = DashboardController;
