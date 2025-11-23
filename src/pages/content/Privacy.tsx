import React from "react";
import { Link } from "react-router-dom";
import MainNav from "../../components/MainNav";
import Footer from "../../components/Footer";

export default function Privacy() {
    return (
        <div className="min-h-screen bg-background text-text">
            <MainNav />
            <div className="max-w-4xl mx-auto px-4 py-12">
                <h1 className="text-3xl font-black tracking-tight mb-6">Política de Privacidade</h1>
                <div className="text-muted text-xs mb-6">Última atualização: 22 de novembro de 2024</div>

                <div className="prose prose-invert max-w-none space-y-8">
                    <section className="bg-surface border border-border rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-text mb-4">1. Informações que Coletamos</h2>
                        <p className="text-muted leading-relaxed mb-4">
                            Coletamos diferentes tipos de informações para fornecer e melhorar nossos serviços:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted">
                            <li><strong className="text-text">Informações de Conta:</strong> Nome, e-mail, telefone e senha</li>
                            <li><strong className="text-text">Informações de Pagamento:</strong> Dados de cartão e histórico de transações</li>
                            <li><strong className="text-text">Informações de Uso:</strong> Como você interage com nossa plataforma</li>
                            <li><strong className="text-text">Informações de Dispositivo:</strong> Tipo de dispositivo, sistema operacional, navegador</li>
                        </ul>
                    </section>

                    <section className="bg-surface border border-border rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-text mb-4">2. Como Usamos Suas Informações</h2>
                        <p className="text-muted leading-relaxed mb-4">
                            Utilizamos as informações coletadas para:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted">
                            <li>Fornecer, manter e melhorar nossos serviços</li>
                            <li>Processar transações e enviar confirmações</li>
                            <li>Enviar comunicações importantes sobre sua conta</li>
                            <li>Personalizar sua experiência na plataforma</li>
                            <li>Detectar e prevenir fraudes e abusos</li>
                            <li>Cumprir obrigações legais</li>
                        </ul>
                    </section>

                    <section className="bg-surface border border-border rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-text mb-4">3. Compartilhamento de Informações</h2>
                        <p className="text-muted leading-relaxed mb-4">
                            Não vendemos suas informações pessoais. Podemos compartilhar suas informações apenas nas seguintes situações:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted">
                            <li>Com fornecedores de serviços que nos ajudam a operar a plataforma</li>
                            <li>Com organizadores de eventos quando você compra ingressos</li>
                            <li>Quando exigido por lei ou para proteger nossos direitos</li>
                            <li>Com seu consentimento explícito</li>
                        </ul>
                    </section>

                    <section className="bg-surface border border-border rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-text mb-4">4. Segurança dos Dados</h2>
                        <p className="text-muted leading-relaxed">
                            Implementamos medidas de segurança técnicas e organizacionais apropriadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. Isso inclui criptografia SSL/TLS, armazenamento seguro de senhas e auditorias regulares de segurança.
                        </p>
                    </section>

                    <section className="bg-surface border border-border rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-text mb-4">5. Seus Direitos</h2>
                        <p className="text-muted leading-relaxed mb-4">
                            De acordo com a LGPD (Lei Geral de Proteção de Dados), você tem os seguintes direitos:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted">
                            <li>Acessar suas informações pessoais</li>
                            <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
                            <li>Solicitar a exclusão de seus dados</li>
                            <li>Revogar o consentimento para o uso de seus dados</li>
                            <li>Solicitar a portabilidade de seus dados</li>
                            <li>Obter informações sobre com quem compartilhamos seus dados</li>
                        </ul>
                    </section>

                    <section className="bg-surface border border-border rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-text mb-4">6. Cookies e Tecnologias Similares</h2>
                        <p className="text-muted leading-relaxed">
                            Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o uso da plataforma e personalizar conteúdo. Você pode controlar o uso de cookies através das configurações do seu navegador.
                        </p>
                    </section>

                    <section className="bg-surface border border-border rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-text mb-4">7. Retenção de Dados</h2>
                        <p className="text-muted leading-relaxed">
                            Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir os propósitos descritos nesta política, a menos que um período de retenção mais longo seja exigido ou permitido por lei.
                        </p>
                    </section>

                    <section className="bg-surface border border-border rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-text mb-4">8. Alterações nesta Política</h2>
                        <p className="text-muted leading-relaxed">
                            Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre mudanças significativas através da plataforma ou por e-mail. Recomendamos que você revise esta política regularmente.
                        </p>
                    </section>

                    <section className="bg-surface border border-border rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-text mb-4">9. Contato</h2>
                        <p className="text-muted leading-relaxed">
                            Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato com nosso Encarregado de Proteção de Dados através de{" "}
                            <a href="mailto:privacy@example.com" className="text-primary hover:underline">privacy@example.com</a>
                        </p>
                    </section>
                </div>

                <div className="mt-12 pt-8 border-t border text-center">
                    <Link to="/" className="text-primary hover:underline">
                        ← Voltar para a página inicial
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}
