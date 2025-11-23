import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MainNav from "../components/MainNav";
import Footer from "../components/Footer";
import Button from "../components/Form/Button";
import { ArrowRightIcon, TicketIcon, UserGroupIcon, BuildingStorefrontIcon, StarIcon } from "@heroicons/react/24/outline";
import PageTransition from "../components/transitions/PageTransition";

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

export default function Home() {
    return (
        <PageTransition>
            <div className="min-h-screen bg-background text-text overflow-x-hidden">
                {/* Navigation */}
                <MainNav />

                {/* Hero Section */}
                <section className="relative min-h-[80vh] flex items-center justify-center pt-16 overflow-hidden">
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10"></div>

                    <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-sm bg-white/5 border border-white/10 text-secondary text-[10px] font-bold tracking-widest uppercase mb-6 backdrop-blur-sm"
                        >
                            <span className="w-1.5 h-1.5 bg-secondary rounded-full mr-1.5 animate-ping"></span>
                            O Futuro dos Eventos
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.7, ease: "easeOut" }}
                            className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-none"
                        >
                            CRIE O <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
                                EXTRAORDINÁRIO
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.0, duration: 0.7 }}
                            className="max-w-2xl mx-auto text-base text-muted mb-8 font-light leading-relaxed"
                        >
                            Uma plataforma de gestão de eventos que não é apenas funcional, é <span className="text-text font-medium">visceral</span>.
                            Controle total, design imersivo e performance incomparável.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.5 }}
                            className="flex flex-col sm:flex-row justify-center items-center gap-4"
                        >
                            <Button
                                onClick={() => window.location.href = '/auth/register'}
                                size="md"
                                className="group"
                            >
                                Criar Evento
                                <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button
                                onClick={() => window.location.href = '/explore'}
                                variant="secondary"
                                size="md"
                            >
                                Explorar Eventos
                            </Button>
                        </motion.div>
                    </div>
                </section>

                {/* Features Section - Glass Cards */}
                <section className="py-20 relative">
                    <div className="max-w-7xl mx-auto px-4">
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-5"
                        >
                            {/* Card 1 */}
                            <motion.div variants={fadeInUp} className="group relative p-1 rounded-sm bg-gradient-to-b from-white/10 to-white/5 hover:from-primary/50 hover:to-accent/50 transition-all duration-500">
                                <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent opacity-0 group-hover:opacity-100 rounded-sm blur-xl transition-opacity duration-500"></div>
                                <div className="relative h-full bg-background/90 backdrop-blur-xl rounded-sm p-5 border border-white/10 group-hover:border-white/20 overflow-hidden">
                                    <div className="absolute top-0 right-0 p-5 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                                        <TicketIcon className="w-24 h-24 text-text" />
                                    </div>
                                    <div className="w-10 h-10 bg-primary/20 rounded-sm flex items-center justify-center mb-4 border border-primary/30 group-hover:scale-110 transition-transform duration-300">
                                        <TicketIcon className="w-5 h-5 text-primary-light" />
                                    </div>
                                    <h3 className="text-lg font-bold text-text mb-3">Ingressos Inteligentes</h3>
                                    <p className="text-sm text-muted leading-relaxed">
                                        Venda ingressos com tecnologia NFT, QR Codes dinâmicos e prevenção total contra fraudes. O controle está em suas mãos.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Card 2 */}
                            <motion.div variants={fadeInUp} className="group relative p-1 rounded-sm bg-gradient-to-b from-white/10 to-white/5 hover:from-secondary/50 hover:to-blue-500/50 transition-all duration-500 md:-translate-y-6">
                                <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 rounded-sm blur-xl transition-opacity duration-500"></div>
                                <div className="relative h-full bg-background/90 backdrop-blur-xl rounded-sm p-5 border border-white/10 group-hover:border-white/20 overflow-hidden">
                                    <div className="absolute top-0 right-0 p-5 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                                        <BuildingStorefrontIcon className="w-24 h-24 text-text" />
                                    </div>
                                    <div className="w-10 h-10 bg-secondary/20 rounded-sm flex items-center justify-center mb-4 border border-secondary/30 group-hover:scale-110 transition-transform duration-300">
                                        <BuildingStorefrontIcon className="w-5 h-5 text-secondary" />
                                    </div>
                                    <h3 className="text-lg font-bold text-text mb-3">Marketplace Curado</h3>
                                    <p className="text-sm text-muted leading-relaxed">
                                        Acesso exclusivo aos fornecedores mais bem avaliados do mercado. Conecte-se com a elite dos serviços de eventos.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Card 3 */}
                            <motion.div variants={fadeInUp} className="group relative p-1 rounded-sm bg-gradient-to-b from-white/10 to-white/5 hover:from-accent/50 hover:to-indigo-500/50 transition-all duration-500">
                                <div className="absolute inset-0 bg-gradient-to-b from-accent/20 to-transparent opacity-0 group-hover:opacity-100 rounded-sm blur-xl transition-opacity duration-500"></div>
                                <div className="relative h-full bg-background/90 backdrop-blur-xl rounded-sm p-5 border border-white/10 group-hover:border-white/20 overflow-hidden">
                                    <div className="absolute top-0 right-0 p-5 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                                        <UserGroupIcon className="w-24 h-24 text-text" />
                                    </div>
                                    <div className="w-10 h-10 bg-accent/20 rounded-sm flex items-center justify-center mb-4 border border-accent/30 group-hover:scale-110 transition-transform duration-300">
                                        <UserGroupIcon className="w-5 h-5 text-accent" />
                                    </div>
                                    <h3 className="text-lg font-bold text-text mb-3">Gestão de Comunidade</h3>
                                    <p className="text-sm text-muted leading-relaxed">
                                        Engaje seu público antes, durante e depois do evento. Ferramentas de chat, networking e feedback em tempo real.
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-12 bg-surface/50 border-y border-white/5">
                    <div className="max-w-7xl mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-sm overflow-hidden"
                        >
                            <div className="bg-background p-6 flex flex-col items-center justify-center group hover:bg-surface transition-colors">
                                <span className="text-2xl font-black text-text mb-1 group-hover:text-primary transition-colors">10k+</span>
                                <span className="text-[10px] text-disabled uppercase tracking-widest">Eventos</span>
                            </div>
                            <div className="bg-background p-6 flex flex-col items-center justify-center group hover:bg-surface transition-colors">
                                <span className="text-2xl font-black text-text mb-1 group-hover:text-secondary transition-colors">500k+</span>
                                <span className="text-[10px] text-disabled uppercase tracking-widest">Ingressos</span>
                            </div>
                            <div className="bg-background p-6 flex flex-col items-center justify-center group hover:bg-surface transition-colors">
                                <span className="text-2xl font-black text-text mb-1 group-hover:text-accent transition-colors">2k+</span>
                                <span className="text-[10px] text-disabled uppercase tracking-widest">Parceiros</span>
                            </div>
                            <div className="bg-background p-6 flex flex-col items-center justify-center group hover:bg-surface transition-colors">
                                <div className="flex items-center gap-1 mb-1">
                                    <span className="text-2xl font-black text-text group-hover:text-warning transition-colors">4.9</span>
                                    <StarIcon className="w-5 h-5 text-warning fill-current" />
                                </div>
                                <span className="text-[10px] text-disabled uppercase tracking-widest">Rating</span>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent -z-10"></div>
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-black text-text mb-6 tracking-tight">
                                PRONTO PARA O <br />
                                <span className="text-primary">PRÓXIMO NÍVEL?</span>
                            </h2>
                            <p className="text-base text-muted mb-8">
                                Junte-se aos visionários que estão redefinindo o mercado de entretenimento.
                            </p>
                            <Button
                                onClick={() => window.location.href = '/auth/register'}
                                size="lg"
                            >
                                Começar Gratuitamente
                                <ArrowRightIcon className="w-5 h-5 ml-2" />
                            </Button>
                        </motion.div>
                    </div>
                </section>

                {/* Footer */}
                <Footer />
            </div>
        </PageTransition>
    );
}
