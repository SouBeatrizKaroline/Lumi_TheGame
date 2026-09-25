# Lumi & the Lost Stars

> *"The forest remembers its light."*

**Lumi & the Lost Stars** é um jogo web 2D poético, aconchegante e totalmente jogável diretamente no navegador, desenvolvido em HTML5 Canvas e JavaScript modular de alta performance, sem dependências externas.

O projeto foi construído seguindo fielmente a direção de arte e o conceito visual da protagonista **Lumi**: uma pequena gatinha preta com olhos dourados cintilantes, capa azul esvoaçante e um pingente mágico em forma de estrela.

---

## 🌟 1. Conceito e História

As estrelas desapareceram do céu noturno e seus fragmentos caíram sobre uma floresta encantada, mergulhando-a em sombras e silêncio. No papel de Lumi, sua missão é explorar a floresta, recuperar os 20 fragmentos principais de estrelas e as 3 estrelas secretas perdidas, devolvendo progressivamente a luz, a vida e a magia ao mundo até o despertar da lendária **Árvore Ancestral**.

---

## 🎮 2. Gameplay e Mecânicas

### Movimentação Refinada & Platforming Polido
- **Aceleração e desaceleração suaves:** sem deslizamentos bruscos; controles responsivos e naturais.
- **Coyote Time (130ms):** janela de tolerância que permite pular mesmo logo após sair de uma beirada.
- **Jump Buffer (130ms):** armazena o comando de pulo instantes antes de tocar o chão para um pulo contínuo e sem frustração.
- **Pulo Variável:** a altura do salto é proporcional ao tempo em que a tecla/botão é pressionado.
- **Cogumelos Elásticos:** grandes cogumelos bioluminescentes funcionam como trampolins com dispersão de esporos brilhantes.
- **Checkpoints Rúnicos:** monólitos de pedra ancestrais que se iluminam ao toque e salvam o progresso com segurança.
- **Respawn Gentil (Sem Game Over):** cair no riacho ou em fendas dissolve Lumi em poeira estelar cintilante e a transporta de volta ao último monólito ativado, sem penalidades de vida.

### Controles
- **Desktop:**
  - `A` ou `←` : Mover para a esquerda
  - `D` ou `→` : Mover para a direita
  - `W` / `↑` / `Espaço` : Pular (segure para altura máxima)
  - `Shift` : Correr
- **Dispositivos Móveis e Tablets:**
  - Botões touch translúcidos discretos no canto inferior esquerdo (`←` e `→`) e botão de salto no canto inferior direito (`↑`).

---

## 🌲 3. Mapa da Fase e Zonas

A jornada se desenvolve em uma fase única, horizontal e totalmente explorável em ambas as direções:

1. **Início da Floresta (`x: 0 – 1150`):** Colinas suaves de musgo e pedras ancestrais para introdução aos saltos.
2. **Bosque dos Cogumelos (`x: 1150 – 2450`):** Cogumelos gigantes elásticos, copas altas e caminhos verticais.
   - *💎 Estrela Secreta 1:* Escondida no topo da copa dos cogumelos.
3. **Ponte Antiga (`x: 2450 – 3650`):** Grande ponte pênsil de madeira sobre um despenhadeiro com lanternas douradas.
   - *💎 Estrela Secreta 2:* Oculta nos arcos de pedra sob a ponte.
4. **Riacho Encantado (`x: 3650 – 4850`):** Águas correntes, cascatas cintilantes e pedras de apoio sobre a correnteza.
5. **Clareira Mística (`x: 4850 – 5950`):** Ruínas místicas tomadas por flores e arcos rúnicos.
   - *💎 Estrela Secreta 3:* Guardada na fenda superior do arco em ruínas.
6. **Árvore Ancestral (`x: 5950 – 7200`):** O santuário sagrado final onde Lumi restaura a constelação perdida.

---

## ✨ 4. A Floresta se Transforma (Mecânica Central)

O ambiente reage dinamicamente à porcentagem de estrelas recuperadas:

- **0%:** Floresta escura e silenciosa, sombras azuis profundas, pouquíssimos vagalumes, céu despido de estrelas.
- **25%:** Cogumelos começam a irradiar bioluminescência ciano e magenta; nuvens de vagalumes surgem na vegetação.
- **50%:** Flores se abrem, riachos ganham reflexos cintilantes e as primeiras estrelas retornam ao céu noturno.
- **75%:** A floresta ganha tons vibrantes de lilás, lavanda e dourado; a brisa movimenta as folhas e constelações surgem no horizonte.
- **100%:** A floresta floresce plenamente. A **Árvore Ancestral** desperta com seiva dourada, pétalas celestiais e uma espiral estelar que reacende o firmamento.

---

## 🎶 5. Motor de Áudio Procedural (Web Audio API)

O jogo utiliza um sintetizador procedural integrado via Web Audio API, dispensando arquivos de áudio externos e garantindo zero falhas de carregamento:
- **Trilha Sonora Ambiente:** Acordes flutuantes em escala pentatônica com filtros aconchegantes e arpeggios estelares.
- **SFX:** Passos macios, pulos com curva harmônica, sinos celestiais na coleta de estrelas, acorde ressonante nas estrelas secretas, tigela tibetana rúnica nos checkpoints e fanfarra cósmica na vitória.

---

## ♿ 6. Acessibilidade e Configurações

Acessíveis a qualquer momento através do menu ou do botão de engrenagem (`⚙️`):
- Controle independente de volume: Música e Efeitos Sonoros (0% a 100%).
- **Tremor de Tela (Screen Shake):** Ativar ou desativar.
- **Reduzir Movimento:** Desativa tremores e suaviza efeitos para maior conforto visual.
- **Densidade de Partículas:** Configuração em três níveis (Baixa, Média, Alta).
- **Alto Contraste de Colecionáveis:** Adiciona anéis de sinalização pulsantes aos fragmentos de estrela.

---

## 📂 7. Estrutura Modular da Arquitetura

```
Lumi_TheGame/
├── index.html          # Ponto de entrada, viewport canvas, HUD e overlays
├── css/
│   └── style.css       # Estilização visual, paleta aconchegante e controles touch
├── js/
│   ├── config.js       # Constantes globais, dimensões, física e cores
│   ├── audio.js        # Motor de áudio procedural (Web Audio API)
│   ├── camera.js       # Câmera com lerp, screen shake e modo cutscene
│   ├── particles.js    # Vagalumes, explosões estelares, esporos e textos flutuantes
│   ├── collectibles.js # Fragmentos principais, estrelas secretas e atração magnética
│   ├── checkpoint.js   # Monólitos rúnicos, ativação e respawn gracioso
│   ├── player.js       # Lumi: máquina de estados, física, colisões e renderizador
│   ├── level.js        # Plataformas, cogumelos elásticos, água e cenários
│   ├── world.js        # Parallax multicamadas e transformação da floresta (0% a 100%)
│   ├── ui.js           # Gerenciador de HUD, modais, acessibilidade e touch
│   └── game.js         # Loop principal, compositor de iluminação e máquina de estados
└── README.md           # Documentação completa do projeto
```

---

## 🚀 8. Como Executar

Por ser uma aplicação web nativa sem dependências de compilação:

1. Abra diretamente o arquivo `index.html` em qualquer navegador moderno (Chrome, Firefox, Safari, Edge); ou
2. Execute um servidor local simples:
   ```bash
   # Usando Python 3
   python3 -m http.server 8000
   ```
   E acesse `http://localhost:8000` no seu navegador.
